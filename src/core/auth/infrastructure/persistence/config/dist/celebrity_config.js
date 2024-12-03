"use strict";
exports.__esModule = true;
exports.userPermissionModel = exports.UserPermissionSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UserPermissionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true }
});
exports.userPermissionModel = mongoose_1.model("UserPermission", exports.UserPermissionSchema);
