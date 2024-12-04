"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageModel = exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
const date_utility_1 = __importDefault(require("../../../../../core/shared/application/utils/utilities/date_utility"));
exports.MessageSchema = new mongoose_1.Schema({
    chatId: mongoose_1.Schema.Types.ObjectId,
    status: String,
    messageText: String,
    senderId: mongoose_1.Schema.Types.ObjectId,
    messageType: String,
    sentAt: { type: Date, default: date_utility_1.default.getUTCNow() },
    isAIGenerated: Boolean
});
exports.messageModel = (0, mongoose_1.model)("Message", exports.MessageSchema);
//# sourceMappingURL=message_config.js.map