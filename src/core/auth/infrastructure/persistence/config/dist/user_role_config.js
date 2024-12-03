"use strict";
exports.__esModule = true;
exports.userRoleModel = exports.UserRoleSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UserRoleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    desc: { type: String },
    permissions: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'UserPermission' }
});
exports.userRoleModel = mongoose_1.model("UserRole", exports.UserRoleSchema);
