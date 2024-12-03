import { ChatType } from "../../../../core/chat/domain/enum/chat_type";
import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";
import { IChatRepository, IIChatRepository } from "../contract/data_access/chat_repository";
import { Chat } from "../../../../core/chat/domain/entity/chat";
import { Participant } from "../../../../core/chat/domain/entity/participant";
import { IIMessageRepository, IMessageRepository } from "../contract/data_access/message_repository";
import { PaginationResponse } from "../../../../core/shared/domain/model/pagination";
import ChatResponse from "../../../../core/chat/domain/dto/responses/chat_response";
import { IChatLogic } from "../contract/logic/chat_logic";
import { InitiateChat, TextMessageChatRequest, VoiceChatRequest } from "../../../../core/chat/domain/dto/requests/initiate_chat";
import IEventTracer, { IIEventTracer } from "../../../../core/shared/application/contract/observability/event_tracer";
import ICacheService, { IICacheService } from "../../../../core/shared/application/contract/data_access/cache/cache_service";
import { ICelebrityLogic, IICelebrityLogic } from "../../../../core/raging_fan/application/contract/logic/celebrity_logic";
import NotFoundException from"../../../../core/shared/application/utils/exceptions/not_found_exception";
import { IAuthLogic, IIAuthLogic } from"../../../../core/auth/application/contract/logic/auth_logic";
import { AIMessageResponseUnit, AIMessageUnit } from"../../../../core/ai/domain/model/ai_message";
import { AIMessageUnitRole } from"../../../../core/ai/domain/enum/ai_message_enum";
import { IConversationAI, IIConversationAI } from"../../../../core/ai/application/contract/services/conversation_ai_service";
import { Message } from"../../../../core/chat/domain/entity/message";
import { MessageStatus } from"../../../../core/chat/domain/enum/message_status";
import { MessageType } from"../../../../core/chat/domain/enum/message_type";
import DateUtility from"../../../../core/shared/application/utils/utilities/date_utility";
import User from"../../../../core/auth/domain/entity/user";
import { CelebrityResponse } from"../../../../core/raging_fan/domain/dto/responses/celebrity";
import { IINewsService, INewsService } from "../../../../core/raging_fan/application/contract/services/news_service";
import SerializationUtility from "../../../../core/shared/application/utils/utilities/serialization_utility";




@injectable()
export default class ChatLogic implements IChatLogic{
    private readonly CacheChatDurationInSeconds: number = 60 * 60
    private readonly ChatCachePrefix: string = `CHAT_`;
    private readonly ChatCacheInstructionPrefix: string = `CHAT_INSTRUCTION_`;
    public constructor(
        @inject(IIChatRepository) private readonly chatRepository: IChatRepository,
        @inject(IIMessageRepository) private readonly messageRepository: IMessageRepository,
        @inject(IICelebrityLogic) private readonly celebrityLogic: ICelebrityLogic,
        @inject(IIAuthLogic) private readonly authLogic: IAuthLogic,
        @inject(IIConversationAI) private readonly conversationAI: IConversationAI,
        @inject(IINewsService) private readonly newsService: INewsService,
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IICacheService) private readonly cacheService: ICacheService
    ){

    }

    private saveChatRecentHistoryInCache = async (chat: ChatResponse): Promise<boolean> => {
        try{
            return await this.cacheService.addAsync(`${this.ChatCachePrefix}${chat._id}`, chat, this.CacheChatDurationInSeconds)
        }catch(ex){
            let evtInstance = this.eventTracer.instance();
            evtInstance.isExceptionWithMessage(ex.message);
            return false;

        }
    }

    private getChatRecentHistoryInCache = async (chatId: Types.ObjectId): Promise<ChatResponse | null> => {
        try{
            let chatResponse = await this.cacheService.getAsync<ChatResponse>(`${this.ChatCachePrefix}${chatId}`);
            return chatResponse;
        }catch(ex){
            let evtInstance = this.eventTracer.instance();
            evtInstance.isExceptionWithMessage(ex.message);
            return null;

        }
    }

    private getChat = async (initiateChat: InitiateChat): Promise<Chat> => {
        const evtTracer = this.eventTracer.instance();
        let chat: Chat;
        if(initiateChat.chatId){
            evtTracer.say("Getting chat by id")
            chat = await this.chatRepository.getByIdAsync(new Types.ObjectId(initiateChat.chatId))
        }
        if(!chat){
            evtTracer.say("Getting chat by userId and celebrityId")
            chat = (await this.chatRepository.getChat({userId: initiateChat.userId, celebrityId: initiateChat.celebrityId}))[0]
        }

        if(!chat){
            evtTracer.say("No chat found, creating chat")
            let chatToSave = new Chat(new Types.ObjectId())
            chatToSave.chatType = initiateChat.chatType ?? ChatType.private;
            chatToSave.participants = [new Participant({chatId: chatToSave._id, celebrityId: initiateChat.celebrityId}), new Participant({chatId: chatToSave._id, userId: initiateChat.userId})]
            chat = await this.chatRepository.addAsync(chatToSave)
        }
        evtTracer.isSuccess()
        return chat;
    }
    startChat = async (initiateChat: InitiateChat): Promise<ChatResponse> => {
        // get chat id
        const evtTracer = this.eventTracer.instance();
        evtTracer.request = initiateChat;
        evtTracer.say("Initiate Chat")
        try{
            
            evtTracer.say("Getting chat")
            let chat = await this.getChat(initiateChat)
            // send last 20 messages
            evtTracer.say("Getting most recent messages for chat")
            let messages = await this.messageRepository.getPagedAsyncDecrement({chatId: chat._id}, null, 20)

            // getting user 
            let user = await this.authLogic.getUser(initiateChat.userId);
            let chatResponse = chat as ChatResponse
            chatResponse.messages = messages;
            chatResponse.userName = user.name;

            // add chat to redis cache for faster access
            evtTracer.say(`Caching recent chat for faster access`);
            this.saveChatRecentHistoryInCache(chatResponse);
            evtTracer.isSuccessWithResponseAndMessage(chatResponse);

            return chatResponse
        } catch(ex){
            evtTracer.isExceptionWithMessage(ex.message);
            throw ex
        }

    }

    getChatForMessage = async (textMessageRequest: TextMessageChatRequest) => {
        const evtTracer = this.eventTracer.instance();
        evtTracer.say("Getting chat");
        let chat: ChatResponse = await this.getChatRecentHistoryInCache(textMessageRequest.chatId);
        if(!chat){
            evtTracer.say("No chat found in cache, starting chat")
            chat = await this.startChat({chatId: textMessageRequest.chatId, userId: textMessageRequest.senderId, celebrityId: null, chatType: ChatType.private})
        }
        evtTracer.isSuccessWithResponseAndMessage(chat)
        return chat;
    }

    getChatForVoice = async (voiceChatRequest: VoiceChatRequest) => {
        const evtTracer = this.eventTracer.instance();
        evtTracer.say("Getting chat");
        let chat: ChatResponse = await this.getChatRecentHistoryInCache(voiceChatRequest.chatId);
        if(!chat){
            evtTracer.say("No chat found in cache, starting chat")
            chat = await this.startChat({chatId: voiceChatRequest.chatId, userId: voiceChatRequest.senderId, celebrityId: null, chatType: ChatType.private})
        }
        evtTracer.isSuccessWithResponseAndMessage(chat)
        return chat;
    }
    private getLatestNewsForCelebrityMessage = (celebrity: CelebrityResponse) => {
        return `News summary for ${celebrity.fullName}`
    }
    buildInstructionQuery = async (textMessageRequest: TextMessageChatRequest | VoiceChatRequest, celebrity: CelebrityResponse, user: User) : Promise<string>=> {
        let isNewsQuery: boolean = false;
        if(textMessageRequest instanceof VoiceChatRequest){
            textMessageRequest = {...textMessageRequest, message: this.getLatestNewsForCelebrityMessage(celebrity)}
            isNewsQuery = true;
        }
        
        isNewsQuery = isNewsQuery ? isNewsQuery : await this.newsService.isNewsQuery(textMessageRequest.message);
        
        
        // build the instruction query
        let conversationTraining = celebrity.training.conversationTemplate.map(conversation => {
            let conversationDict: {[key: string]: string} = {}
            conversationDict[user.name] = conversation.fanMessage;
            conversationDict[celebrity.fullName] = conversation.celebrityReply

            return conversationDict
        })
        let instructionQuery = `You are ${celebrity.fullName}, the popular footballer. You are known for being ${celebrity.training.personality}. Fans look up to you for your skills and wisdom. In this conversation, you are engaging with ${user.name}, a devoted fan. You should be conversational and avoid excessive formaility. Always respond in line with your personality. Please, never say you are an AI. Instead say you are ${celebrity.fullName} if asked.
        Typical conversation template [${SerializationUtility.serializeJson(conversationTraining)}].
        `;
        
        // get if you need extra news to add to this
        if(isNewsQuery){
            let news = await this.newsService.getNewsUpdateForMessage(textMessageRequest.message, celebrity.fullName)
            instructionQuery += `${celebrity.fullName}'s Recent news: ${news}`
        }

        return instructionQuery;
    }

    private getCelebrityAndUserFromChatResponse = async  (chat: ChatResponse) => {
        let chatCelebrityParticipant = chat.participants.find(participant => participant.celebrityId);
        const celebrityId = new Types.ObjectId(chatCelebrityParticipant.celebrityId)
        const celebrity = await this.celebrityLogic.getCelebrity(celebrityId, {useCache: true})
        if(!celebrity){
            throw new NotFoundException("Celebrity Participant not found")
        }

        let chatUserParticipant = chat.participants.find(participant => participant.userId);
        const userId = new Types.ObjectId(chatUserParticipant.userId)
        const user = await this.authLogic.getUser(userId, {useCache: true})

        return {celebrity, user};
    }

    respondToTextMessage = async (textMessageRequest: TextMessageChatRequest): Promise<Message> => {
        // Get celebrity training instruction to work with
        textMessageRequest.sentAt = DateUtility.getUTCNow();
        const evtTracer = this.eventTracer.instance();
        evtTracer.request = textMessageRequest;
        evtTracer.say("Text Message Chat")
        try{
            evtTracer.say("Getting chat");
            let chat: ChatResponse = await this.getChatForMessage(textMessageRequest);

            evtTracer.say(`Getting participants`)
            let {celebrity, user} = await this.getCelebrityAndUserFromChatResponse(chat);

            // build the instruction query
            let instructionQuery = await this.buildInstructionQuery(textMessageRequest, celebrity, user);
            evtTracer.say(`Gotten celebrity: ${celebrity.fullName}.\nBuilt instruction query: ${instructionQuery}`)

            
            // get other related messages for context
            let messagesMemoryWindow =  chat.messages.slice(0, 6)
            let messagesThread: AIMessageUnit[] = [...messagesMemoryWindow].reverse().map(message => { // reverse because newer messages come first
                let role = message.senderId.toString() === celebrity._id.toString() ? AIMessageUnitRole.system : AIMessageUnitRole.user;
                return new AIMessageUnit({
                    role: role,
                    content: message.messageText
                })
            })
            evtTracer.say(`Added previous messages for context. Size ${messagesMemoryWindow.length}`)
            
            // call ai to get response
            evtTracer.say(`Calling conversationAI`)
            const conversationResponse: AIMessageResponseUnit = await this.conversationAI.message(instructionQuery, messagesThread, textMessageRequest.message);

            
            
            evtTracer.say(`Updating cache and saving messages`)
            
            let userMessage = new Message({
                chatId: chat._id,
                status: MessageStatus.read,
                messageText: textMessageRequest.message,
                senderId: user._id,
                messageType: MessageType.text,
                sentAt: textMessageRequest.sentAt
            })
            
            let celebrityResponse = new Message({
                chatId: chat._id,
                status: MessageStatus.sent,
                messageText: conversationResponse.message.content, 
                senderId: celebrity._id,
                messageType: MessageType.text,
                isAIGenerated: true,
                sentAt: textMessageRequest.sentAt
            })

            this.updateChatCacheAndDb(chat, celebrityResponse, userMessage) // no need to await this update
            // return response
            

            evtTracer.isSuccessWithResponseAndMessage(celebrityResponse);

            return celebrityResponse;
        }catch(ex){
            evtTracer.isExceptionWithMessage(ex.message);
            throw ex
        }

        
    }

    updateChatCacheAndDb = async (chat: ChatResponse, celebrityResponse: Message, userMessage: Message) => {
        // save chat and response on cache/db

        let addedMessages = await this.messageRepository.addManyAsync([userMessage, celebrityResponse]) // no need to await
        
        chat.messages.unshift(userMessage)
        chat.messages.unshift(celebrityResponse);

        let cached = await this.saveChatRecentHistoryInCache(chat);
        console.log({cached, addedMessages})
    }

    getVoiceCallInstructionForChat = async (chat: VoiceChatRequest): Promise<string> => {
        // get chat, 
        let cacheChatInstructionId = `${this.ChatCacheInstructionPrefix}${chat.chatId}`
        let cachedInstruction = await this.cacheService.getAsync<string>(cacheChatInstructionId);
        if(cachedInstruction && cachedInstruction !== '{}'){
            console.log(`Cached Instruction in use for ${chat.chatId}: ${cachedInstruction}`)
            return cachedInstruction;
        }
        let voiceChat = await this.getChatForVoice(chat);

        // evtTracer.say(`Getting participants`)
        let {celebrity, user} = await this.getCelebrityAndUserFromChatResponse(voiceChat);



        let instruction = await this.buildInstructionQuery(chat, celebrity, user)
        this.cacheService.addAsync(cacheChatInstructionId, instruction, 60 * 30)
        return instruction;

    }
}