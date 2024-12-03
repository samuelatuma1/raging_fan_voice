"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("../../../../core/shared/domain/entity/base_entity"));
const mongoose_1 = require("mongoose");
class Celebrity extends base_entity_1.default {
    fullName;
    dob;
    profilePicture;
    avatar;
    icons = [];
    constructor(init) {
        let _id = new mongoose_1.Types.ObjectId();
        super(_id);
        this.fullName = init.fullName;
        this.dob = init.dob;
        this.profilePicture = init.profilePicture ?? null;
        this.avatar = init.avatar ?? null;
        this.icons = init.icons ?? [];
    }
}
exports.default = Celebrity;
//# sourceMappingURL=celebrity.js.map