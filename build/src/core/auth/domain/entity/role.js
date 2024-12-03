"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../../../core/shared/domain/entity/base_entity"));
class UserRole extends base_entity_1.default {
    name;
    desc;
    permissions;
    constructor(init) {
        super(new mongoose_1.Types.ObjectId());
        this.name = init.name;
        this.desc = init.desc;
        this.permissions = init.permissions;
    }
}
exports.default = UserRole;
//# sourceMappingURL=role.js.map