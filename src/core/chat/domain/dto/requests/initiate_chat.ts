import { Types } from "mongoose";
import { ChatType } from "../../enum/chat_type";

export class InitiateChat {
    userId: Types.ObjectId;
    celebrityId: Types.ObjectId;
    chatType: ChatType = ChatType.private;
    chatId?: Types.ObjectId
}

export class TextMessageChatRequest {
    message: string;
    chatId: Types.ObjectId;
    senderId: Types.ObjectId;
    sentAt?: Date
}

export class VoiceChatRequest {
    chatId: Types.ObjectId;
    senderId: Types.ObjectId;
    sentAt?: Date
}