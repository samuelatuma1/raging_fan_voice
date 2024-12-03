"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("../../../shared/domain/entity/base_entity"));
const mongoose_1 = require("mongoose");
class User extends base_entity_1.default {
    name;
    email;
    profilePicture;
    roles;
    constructor(init) {
        let _id = new mongoose_1.Types.ObjectId();
        super(_id);
        this.name = init.name;
        this.email = init.email ?? "";
        this.profilePicture = init.profilePicture ?? null;
        this.roles = init.roles ?? [];
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map