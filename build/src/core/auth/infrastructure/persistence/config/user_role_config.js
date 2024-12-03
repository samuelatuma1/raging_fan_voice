"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleModel = exports.UserRoleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserRoleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    desc: { type: String },
    permissions: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'UserPermission' }
});
exports.userRoleModel = (0, mongoose_1.model)("UserRole", exports.UserRoleSchema);
//# sourceMappingURL=user_role_config.js.map