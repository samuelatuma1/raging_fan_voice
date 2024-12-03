"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationTemplateRequest = exports.QueryCelebrity = exports.CreateCelebrityRequest = void 0;
const base_entity_1 = __importDefault(require("../../../../../core/shared/domain/entity/base_entity"));
class CreateCelebrityRequest {
    fullName;
    dob = new Date();
    profilePicture;
    avatar;
    icons = [];
}
exports.CreateCelebrityRequest = CreateCelebrityRequest;
class QueryCelebrity {
    fullName;
    _id;
    page = 0;
    pageSize = 0;
}
exports.QueryCelebrity = QueryCelebrity;
class ConversationTemplateRequest {
    fanMessage;
    celebrityReply;
}
exports.ConversationTemplateRequest = ConversationTemplateRequest;
class CreateCelebrityTraining extends base_entity_1.default {
    celebrityId;
    personality;
    conversationTemplate;
}
exports.default = CreateCelebrityTraining;
//# sourceMappingURL=celebrity.js.map