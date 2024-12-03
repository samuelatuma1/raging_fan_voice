import CelebrityTraining, { ConversationTemplate } from "../../../domain/entity/celebrity_training";
import { model, Schema } from "mongoose";

const ConversationTemplateSchema = new Schema<ConversationTemplate>({
    fanMessage: String,
    celebrityReply : String
})
const celebrityTrainingSchema = new Schema<CelebrityTraining>({
    celebrityId: {type: Schema.Types.ObjectId},
    personality: {type: String},
    conversationTemplate: [ConversationTemplateSchema]
});

export const celebrityTrainingModel = model("CelebrityTraining", celebrityTrainingSchema)