import { Types } from "mongoose";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
import { MessageStatus } from "../enum/message_status";
import { MessageType } from "../enum/message_type";
export interface MessageInit {
    chatId: Types.ObjectId;
    status: MessageStatus | string;
    messageText: string;
    senderId: Types.ObjectId;
    messageType: MessageType | string;
    isAIGenerated?: boolean;
    sentAt?: Date;
}
export declare class Message extends BaseEntity<Types.ObjectId> {
    chatId: Types.ObjectId;
    status: MessageStatus | string;
    messageText: string;
    senderId: Types.ObjectId;
    messageType: MessageType | string;
    isAIGenerated: boolean;
    sentAt: Date;
    constructor(init: MessageInit);
}
