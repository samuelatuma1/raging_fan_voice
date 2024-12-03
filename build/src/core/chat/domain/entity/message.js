"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../../../core/shared/domain/entity/base_entity"));
const date_utility_1 = __importDefault(require("../../../../core/shared/application/utils/utilities/date_utility"));
class Message extends base_entity_1.default {
    // threadId: Types.ObjectId;
    chatId;
    status;
    messageText;
    senderId;
    messageType;
    isAIGenerated;
    sentAt;
    constructor(init) {
        super(new mongoose_1.Types.ObjectId());
        this.chatId = init.chatId;
        this.status = init.status;
        this.senderId = init.senderId;
        this.messageText = init.messageText;
        this.messageType = init.messageType;
        this.isAIGenerated = init.isAIGenerated ?? false;
        this.sentAt = init.sentAt ?? date_utility_1.default.getUTCNow();
    }
}
exports.Message = Message;
//# sourceMappingURL=message.js.map