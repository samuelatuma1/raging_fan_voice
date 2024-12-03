import { model, Model, Schema } from "mongoose";
import { Chat } from "../../../../../core/chat/domain/entity/chat";
import { Participant } from "core/chat/domain/entity/participant";
import { Message } from "core/chat/domain/entity/message";

export const MessageSchema = new Schema<Message> ({
    chatId: Schema.Types.ObjectId,
    status: String,
    messageText: String,
    senderId: Schema.Types.ObjectId,
    messageType: String,
    isAIGenerated: Boolean
})

export const messageModel = model("Message", MessageSchema)