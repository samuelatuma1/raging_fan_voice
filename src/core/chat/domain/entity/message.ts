import { Types } from "mongoose";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
import { MessageStatus } from "../enum/message_status";
import { MessageType } from "../enum/message_type";
import DateUtility from "../../../../core/shared/application/utils/utilities/date_utility";


export interface MessageInit {
    chatId: Types.ObjectId;
    status: MessageStatus | string
    messageText: string 
    senderId: Types.ObjectId
    messageType: MessageType | string
    isAIGenerated?: boolean,
    sentAt?: Date
}
export  class Message extends BaseEntity<Types.ObjectId>{
    // threadId: Types.ObjectId;
    chatId: Types.ObjectId;
    status: MessageStatus | string
    messageText: string 
    senderId: Types.ObjectId
    messageType: MessageType | string
    isAIGenerated: boolean
    sentAt: Date
    constructor(init: MessageInit){
        super(new Types.ObjectId())
        this.chatId = init.chatId;
        this.status = init.status
        this.senderId = init.senderId;
        this.messageText = init.messageText;
        this.messageType = init.messageType;
        this.isAIGenerated = init.isAIGenerated ?? false;
        this.sentAt = init.sentAt ?? DateUtility.getUTCNow()
    }
 }
 