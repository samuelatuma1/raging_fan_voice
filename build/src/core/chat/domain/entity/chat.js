"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const base_entity_1 = __importDefault(require("../../../../core/shared/domain/entity/base_entity"));
class Chat extends base_entity_1.default {
    chatType;
    participants;
}
exports.Chat = Chat;
//# sourceMappingURL=chat.js.map