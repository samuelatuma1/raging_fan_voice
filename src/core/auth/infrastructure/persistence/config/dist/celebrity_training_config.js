"use strict";
exports.__esModule = true;
exports.celebrityTrainingModel = void 0;
var mongoose_1 = require("mongoose");
var ConversationTemplateSchema = new mongoose_1.Schema({
    fanMessage: String,
    celebrityReply: String
});
var celebrityTrainingSchema = new mongoose_1.Schema({
    celebrityId: { type: mongoose_1.Schema.Types.ObjectId },
    personality: { type: String },
    conversationTemplate: [ConversationTemplateSchema]
});
exports.celebrityTrainingModel = mongoose_1.model("CelebrityTraining", celebrityTrainingSchema);
