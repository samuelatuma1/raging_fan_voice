import { model, Model, Schema } from "mongoose";
import { Chat } from "../../../../../core/chat/domain/entity/chat";
import { Participant } from "core/chat/domain/entity/participant";

export const ParticipantSchema = new Schema<Participant> ({
    chatId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    celebrityId: Schema.Types.ObjectId
})
export const ChatSchema = new Schema<Chat>({
    chatType: {type: String, required: true},
    participants: {type: [ParticipantSchema]}
})

export const chatModel = model("Chat", ChatSchema)