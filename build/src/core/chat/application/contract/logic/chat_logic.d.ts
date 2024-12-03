import { Message } from "../../../../../core/chat/domain/entity/message";
import { InitiateChat, TextMessageChatRequest, VoiceChatRequest } from "../../../../../core/chat/domain/dto/requests/initiate_chat";
import ChatResponse from "../../../../../core/chat/domain/dto/responses/chat_response";
export interface IChatLogic {
    startChat(initiateChat: InitiateChat): Promise<ChatResponse>;
    respondToTextMessage(textMessageRequest: TextMessageChatRequest): Promise<Message>;
    getVoiceCallInstructionForChat(chat: VoiceChatRequest): Promise<string>;
}
export declare const IIChatLogic = "IChatLogic";
