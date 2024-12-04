import { model, Model, Schema } from "mongoose";
import { Message } from "../../../../../core/chat/domain/entity/message";
import DateUtility from "../../../../../core/shared/application/utils/utilities/date_utility";

export const MessageSchema = new Schema<Message> ({
    chatId: Schema.Types.ObjectId,
    status: String,
    messageText: String,
    senderId: Schema.Types.ObjectId,
    messageType: String,
    sentAt: {type: Date, default: DateUtility.getUTCNow()},
    isAIGenerated: Boolean
})

export const messageModel = model("Message", MessageSchema)