"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = void 0;
const base_entity_1 = __importDefault(require("../../../../core/shared/domain/entity/base_entity"));
const mongoose_1 = require("mongoose");
class Participant extends base_entity_1.default {
    chatId;
    userId;
    celebrityId;
    constructor(init) {
        super(new mongoose_1.Types.ObjectId());
        this.chatId = init.chatId;
        this.userId = init.userId;
        this.celebrityId = init.celebrityId;
    }
}
exports.Participant = Participant;
//# sourceMappingURL=participant.js.map