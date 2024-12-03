"use strict";
exports.__esModule = true;
exports.userModel = exports.UserSchema = void 0;
var upload_file_schema_1 = require("../../../../../core/shared/infrastructure/persistence/data_access/config/upload_file_schema");
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: String,
    profilePicture: upload_file_schema_1.UploadFileSchema,
    roles: [mongoose_1.Schema.Types.ObjectId]
});
exports.userModel = mongoose_1.model("User", exports.UserSchema);
