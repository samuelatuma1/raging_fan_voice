"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.UserSchema = void 0;
const upload_file_schema_1 = require("../../../../../core/shared/infrastructure/persistence/data_access/config/upload_file_schema");
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: String,
    profilePicture: upload_file_schema_1.UploadFileSchema,
    roles: [mongoose_1.Schema.Types.ObjectId]
});
exports.userModel = (0, mongoose_1.model)("User", exports.UserSchema);
//# sourceMappingURL=user.js.map