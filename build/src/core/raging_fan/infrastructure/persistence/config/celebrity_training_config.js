"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.celebrityTrainingModel = void 0;
const mongoose_1 = require("mongoose");
const ConversationTemplateSchema = new mongoose_1.Schema({
    fanMessage: String,
    celebrityReply: String
});
const celebrityTrainingSchema = new mongoose_1.Schema({
    celebrityId: { type: mongoose_1.Schema.Types.ObjectId },
    personality: { type: String },
    conversationTemplate: [ConversationTemplateSchema]
});
exports.celebrityTrainingModel = (0, mongoose_1.model)("CelebrityTraining", celebrityTrainingSchema);
//# sourceMappingURL=celebrity_training_config.js.map