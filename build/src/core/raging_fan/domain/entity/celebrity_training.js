"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationTemplate = void 0;
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../../../core/shared/domain/entity/base_entity"));
class ConversationTemplate {
    _id = new mongoose_1.Types.ObjectId();
    fanMessage;
    celebrityReply;
    constructor(init) {
        this._id = new mongoose_1.Types.ObjectId();
        this.fanMessage = init.fanMessage;
        this.celebrityReply = init.celebrityReply;
    }
}
exports.ConversationTemplate = ConversationTemplate;
class CelebrityTraining extends base_entity_1.default {
    celebrityId;
    personality;
    conversationTemplate;
    constructor(init) {
        const _id = new mongoose_1.Types.ObjectId();
        super(_id);
        this.celebrityId = init.celebrityId;
        this.personality = init.personality;
        this.conversationTemplate = init.conversationTemplate;
    }
}
exports.default = CelebrityTraining;
//# sourceMappingURL=celebrity_training.js.map