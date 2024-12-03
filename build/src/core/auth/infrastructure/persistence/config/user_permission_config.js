"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPermissionModel = exports.UserPermissionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserPermissionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    desc: { type: String },
});
exports.userPermissionModel = (0, mongoose_1.model)("UserPermission", exports.UserPermissionSchema);
//# sourceMappingURL=user_permission_config.js.map