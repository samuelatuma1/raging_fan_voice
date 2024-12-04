"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_type_1 = require("../../../../core/chat/domain/enum/chat_type");
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
const chat_repository_1 = require("../contract/data_access/chat_repository");
const chat_1 = require("../../../../core/chat/domain/entity/chat");
const participant_1 = require("../../../../core/chat/domain/entity/participant");
const message_repository_1 = require("../contract/data_access/message_repository");
const initiate_chat_1 = require("../../../../core/chat/domain/dto/requests/initiate_chat");
const event_tracer_1 = require("../../../../core/shared/application/contract/observability/event_tracer");
const cache_service_1 = require("../../../../core/shared/application/contract/data_access/cache/cache_service");
const celebrity_logic_1 = require("../../../../core/raging_fan/application/contract/logic/celebrity_logic");
const not_found_exception_1 = __importDefault(require("../../../../core/shared/application/utils/exceptions/not_found_exception"));
const auth_logic_1 = require("../../../../core/auth/application/contract/logic/auth_logic");
const ai_message_1 = require("../../../../core/ai/domain/model/ai_message");
const ai_message_enum_1 = require("../../../../core/ai/domain/enum/ai_message_enum");
const conversation_ai_service_1 = require("../../../../core/ai/application/contract/services/conversation_ai_service");
const message_1 = require("../../../../core/chat/domain/entity/message");
const message_status_1 = require("../../../../core/chat/domain/enum/message_status");
const message_type_1 = require("../../../../core/chat/domain/enum/message_type");
const date_utility_1 = __importDefault(require("../../../../core/shared/application/utils/utilities/date_utility"));
const news_service_1 = require("../../../../core/raging_fan/application/contract/services/news_service");
const serialization_utility_1 = __importDefault(require("../../../../core/shared/application/utils/utilities/serialization_utility"));
let ChatLogic = class ChatLogic {
    chatRepository;
    messageRepository;
    celebrityLogic;
    authLogic;
    conversationAI;
    newsService;
    eventTracer;
    cacheService;
    CacheChatDurationInSeconds = 60 * 60;
    ChatCachePrefix = `CHAT_`;
    ChatCacheInstructionPrefix = `CHAT_INSTRUCTION_`;
    constructor(chatRepository, messageRepository, celebrityLogic, authLogic, conversationAI, newsService, eventTracer, cacheService) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.celebrityLogic = celebrityLogic;
        this.authLogic = authLogic;
        this.conversationAI = conversationAI;
        this.newsService = newsService;
        this.eventTracer = eventTracer;
        this.cacheService = cacheService;
    }
    saveChatRecentHistoryInCache = async (chat) => {
        try {
            return await this.cacheService.addAsync(`${this.ChatCachePrefix}${chat._id}`, chat, this.CacheChatDurationInSeconds);
        }
        catch (ex) {
            let evtInstance = this.eventTracer.instance();
            evtInstance.isExceptionWithMessage(ex.message);
            return false;
        }
    };
    getChatRecentHistoryInCache = async (chatId) => {
        try {
            let chatResponse = await this.cacheService.getAsync(`${this.ChatCachePrefix}${chatId}`);
            return chatResponse;
        }
        catch (ex) {
            let evtInstance = this.eventTracer.instance();
            evtInstance.isExceptionWithMessage(ex.message);
            return null;
        }
    };
    getChat = async (initiateChat) => {
        const evtTracer = this.eventTracer.instance();
        let chat;
        if (initiateChat.chatId) {
            evtTracer.say("Getting chat by id");
            chat = await this.chatRepository.getByIdAsync(new mongoose_1.Types.ObjectId(initiateChat.chatId));
        }
        if (!chat) {
            evtTracer.say("Getting chat by userId and celebrityId");
            chat = (await this.chatRepository.getChat({ userId: initiateChat.userId, celebrityId: initiateChat.celebrityId }))[0];
        }
        if (!chat) {
            evtTracer.say("No chat found, creating chat");
            let chatToSave = new chat_1.Chat(new mongoose_1.Types.ObjectId());
            chatToSave.chatType = initiateChat.chatType ?? chat_type_1.ChatType.private;
            chatToSave.participants = [new participant_1.Participant({ chatId: chatToSave._id, celebrityId: initiateChat.celebrityId }), new participant_1.Participant({ chatId: chatToSave._id, userId: initiateChat.userId })];
            chat = await this.chatRepository.addAsync(chatToSave);
        }
        evtTracer.isSuccess();
        return chat;
    };
    startChat = async (initiateChat) => {
        // get chat id
        const evtTracer = this.eventTracer.instance();
        evtTracer.request = initiateChat;
        evtTracer.say("Initiate Chat");
        try {
            evtTracer.say("Getting chat");
            let chat = await this.getChat(initiateChat);
            // send last 20 messages
            evtTracer.say("Getting most recent messages for chat");
            let messages = await this.messageRepository.getPagedAsyncDecrement({ chatId: chat._id }, null, 20);
            // getting user 
            let user = await this.authLogic.getUser(initiateChat.userId);
            let chatResponse = chat;
            chatResponse.messages = messages;
            chatResponse.userName = user.name;
            // add chat to redis cache for faster access
            evtTracer.say(`Caching recent chat for faster access`);
            this.saveChatRecentHistoryInCache(chatResponse);
            evtTracer.isSuccessWithResponseAndMessage(chatResponse);
            return chatResponse;
        }
        catch (ex) {
            evtTracer.isExceptionWithMessage(ex.message);
            throw ex;
        }
    };
    getChatForMessage = async (textMessageRequest) => {
        const evtTracer = this.eventTracer.instance();
        evtTracer.say("Getting chat");
        let chat = await this.getChatRecentHistoryInCache(textMessageRequest.chatId);
        if (!chat) {
            evtTracer.say("No chat found in cache, starting chat");
            chat = await this.startChat({ chatId: textMessageRequest.chatId, userId: textMessageRequest.senderId, celebrityId: null, chatType: chat_type_1.ChatType.private });
        }
        evtTracer.isSuccessWithResponseAndMessage(chat);
        return chat;
    };
    getChatForVoice = async (voiceChatRequest) => {
        const evtTracer = this.eventTracer.instance();
        evtTracer.say("Getting chat");
        let chat = await this.getChatRecentHistoryInCache(voiceChatRequest.chatId);
        if (!chat) {
            evtTracer.say("No chat found in cache, starting chat");
            chat = await this.startChat({ chatId: voiceChatRequest.chatId, userId: voiceChatRequest.senderId, celebrityId: null, chatType: chat_type_1.ChatType.private });
        }
        evtTracer.isSuccessWithResponseAndMessage(chat);
        return chat;
    };
    getLatestNewsForCelebrityMessage = (celebrity) => {
        return `News summary for ${celebrity.fullName}`;
    };
    buildInstructionQuery = async (textMessageRequest, celebrity, user) => {
        let isNewsQuery = false;
        if (textMessageRequest instanceof initiate_chat_1.VoiceChatRequest) {
            textMessageRequest = { ...textMessageRequest, message: this.getLatestNewsForCelebrityMessage(celebrity) };
            isNewsQuery = true;
        }
        isNewsQuery = isNewsQuery ? isNewsQuery : await this.newsService.isNewsQuery(textMessageRequest.message);
        // build the instruction query
        let conversationTraining = celebrity.training.conversationTemplate.map(conversation => {
            let conversationDict = {};
            conversationDict[user.name] = conversation.fanMessage;
            conversationDict[celebrity.fullName] = conversation.celebrityReply;
            return conversationDict;
        });
        let instructionQuery = `You are ${celebrity.fullName}, the popular footballer. You are known for being ${celebrity.training.personality}. Fans look up to you for your skills and wisdom. In this conversation, you are engaging with ${user.name}, a devoted fan. You should be conversational and avoid excessive formaility. Always respond in line with your personality. Please, never say you are an AI. Instead say you are ${celebrity.fullName} if asked.
        Typical conversation template [${serialization_utility_1.default.serializeJson(conversationTraining)}].
        `;
        // get if you need extra news to add to this
        if (isNewsQuery) {
            let news = await this.newsService.getNewsUpdateForMessage(textMessageRequest.message, celebrity.fullName);
            instructionQuery += `${celebrity.fullName}'s Recent news: ${news}`;
        }
        return instructionQuery;
    };
    getCelebrityAndUserFromChatResponse = async (chat) => {
        let chatCelebrityParticipant = chat.participants.find(participant => participant.celebrityId);
        const celebrityId = new mongoose_1.Types.ObjectId(chatCelebrityParticipant.celebrityId);
        const celebrity = await this.celebrityLogic.getCelebrity(celebrityId, { useCache: true });
        if (!celebrity) {
            throw new not_found_exception_1.default("Celebrity Participant not found");
        }
        let chatUserParticipant = chat.participants.find(participant => participant.userId);
        const userId = new mongoose_1.Types.ObjectId(chatUserParticipant.userId);
        const user = await this.authLogic.getUser(userId, { useCache: true });
        return { celebrity, user };
    };
    respondToTextMessage = async (textMessageRequest) => {
        // Get celebrity training instruction to work with
        textMessageRequest.sentAt = date_utility_1.default.getUTCNow();
        const evtTracer = this.eventTracer.instance();
        evtTracer.request = textMessageRequest;
        evtTracer.say("Text Message Chat");
        try {
            evtTracer.say("Getting chat");
            let chat = await this.getChatForMessage(textMessageRequest);
            evtTracer.say(`Getting participants`);
            let { celebrity, user } = await this.getCelebrityAndUserFromChatResponse(chat);
            // build the instruction query
            let instructionQuery = await this.buildInstructionQuery(textMessageRequest, celebrity, user);
            evtTracer.say(`Gotten celebrity: ${celebrity.fullName}.\nBuilt instruction query: ${instructionQuery}`);
            // get other related messages for context
            let messagesMemoryWindow = chat.messages.slice(0, 6);
            let messagesThread = [...messagesMemoryWindow].reverse().map(message => {
                let role = message.senderId.toString() === celebrity._id.toString() ? ai_message_enum_1.AIMessageUnitRole.system : ai_message_enum_1.AIMessageUnitRole.user;
                return new ai_message_1.AIMessageUnit({
                    role: role,
                    content: message.messageText
                });
            });
            evtTracer.say(`Added previous messages for context. Size ${messagesMemoryWindow.length}`);
            // call ai to get response
            evtTracer.say(`Calling conversationAI`);
            const conversationResponse = await this.conversationAI.message(instructionQuery, messagesThread, textMessageRequest.message);
            evtTracer.say(`Updating cache and saving messages`);
            let userMessage = new message_1.Message({
                chatId: chat._id,
                status: message_status_1.MessageStatus.read,
                messageText: textMessageRequest.message,
                senderId: user._id,
                messageType: message_type_1.MessageType.text,
                sentAt: textMessageRequest.sentAt ?? date_utility_1.default.getUTCNow()
            });
            let celebrityResponse = new message_1.Message({
                chatId: chat._id,
                status: message_status_1.MessageStatus.sent,
                messageText: conversationResponse.message.content,
                senderId: celebrity._id,
                messageType: message_type_1.MessageType.text,
                isAIGenerated: true,
                sentAt: textMessageRequest.sentAt ?? date_utility_1.default.getUTCNow()
            });
            this.updateChatCacheAndDb(chat, celebrityResponse, userMessage); // no need to await this update
            // return response
            evtTracer.isSuccessWithResponseAndMessage(celebrityResponse);
            return celebrityResponse;
        }
        catch (ex) {
            evtTracer.isExceptionWithMessage(ex.message);
            throw ex;
        }
    };
    updateChatCacheAndDb = async (chat, celebrityResponse, userMessage) => {
        // save chat and response on cache/db
        let addedMessages = await this.messageRepository.addManyAsync([userMessage, celebrityResponse]); // no need to await
        console.log("DATE OOO");
        console.log("DATE OOO");
        console.log("DATE OOO");
        console.log({ userMessage, celebrityResponse });
        chat.messages.unshift(userMessage);
        chat.messages.unshift(celebrityResponse);
        let cached = await this.saveChatRecentHistoryInCache(chat);
    };
    getVoiceCallInstructionForChat = async (chat) => {
        // get chat, 
        let cacheChatInstructionId = `${this.ChatCacheInstructionPrefix}${chat.chatId}`;
        await this.cacheService.deleteAsync(cacheChatInstructionId);
        let cachedInstruction = await this.cacheService.getAsync(cacheChatInstructionId);
        console.log({ cachedInstruction });
        if (cachedInstruction && cachedInstruction !== '{}') {
            console.log(`Cached Instruction in use for ${chat.chatId}: ${cachedInstruction}`);
            return cachedInstruction;
        }
        let voiceChat = await this.getChatForVoice(chat);
        // evtTracer.say(`Getting participants`)
        let { celebrity, user } = await this.getCelebrityAndUserFromChatResponse(voiceChat);
        let instruction = await this.buildInstructionQuery(chat, celebrity, user);
        this.cacheService.addAsync(cacheChatInstructionId, instruction, 60 * 30);
        return instruction;
    };
};
ChatLogic = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(chat_repository_1.IIChatRepository)),
    __param(1, (0, tsyringe_1.inject)(message_repository_1.IIMessageRepository)),
    __param(2, (0, tsyringe_1.inject)(celebrity_logic_1.IICelebrityLogic)),
    __param(3, (0, tsyringe_1.inject)(auth_logic_1.IIAuthLogic)),
    __param(4, (0, tsyringe_1.inject)(conversation_ai_service_1.IIConversationAI)),
    __param(5, (0, tsyringe_1.inject)(news_service_1.IINewsService)),
    __param(6, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(7, (0, tsyringe_1.inject)(cache_service_1.IICacheService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], ChatLogic);
exports.default = ChatLogic;
//# sourceMappingURL=chat_logic.js.map