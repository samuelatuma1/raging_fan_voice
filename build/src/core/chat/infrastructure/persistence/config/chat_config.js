"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatModel = exports.ChatSchema = exports.ParticipantSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ParticipantSchema = new mongoose_1.Schema({
    chatId: mongoose_1.Schema.Types.ObjectId,
    userId: mongoose_1.Schema.Types.ObjectId,
    celebrityId: mongoose_1.Schema.Types.ObjectId
});
exports.ChatSchema = new mongoose_1.Schema({
    chatType: { type: String, required: true },
    participants: { type: [exports.ParticipantSchema] }
});
exports.chatModel = (0, mongoose_1.model)("Chat", exports.ChatSchema);
//# sourceMappingURL=chat_config.js.map