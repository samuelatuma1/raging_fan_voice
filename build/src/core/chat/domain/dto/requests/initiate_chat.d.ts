import { Types } from "mongoose";
import { ChatType } from "../../enum/chat_type";
export declare class InitiateChat {
    userId: Types.ObjectId;
    celebrityId: Types.ObjectId;
    chatType: ChatType;
    chatId?: Types.ObjectId;
}
export declare class TextMessageChatRequest {
    message: string;
    chatId: Types.ObjectId;
    senderId: Types.ObjectId;
    sentAt?: Date;
}
export declare class VoiceChatRequest {
    chatId: Types.ObjectId;
    senderId: Types.ObjectId;
    sentAt?: Date;
}
