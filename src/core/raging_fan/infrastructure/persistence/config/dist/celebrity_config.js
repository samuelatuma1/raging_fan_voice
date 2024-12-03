"use strict";
exports.__esModule = true;
exports.celebrityModel = exports.CelebritySchema = void 0;
var mongoose_1 = require("mongoose");
var upload_file_schema_1 = require("../../../../../core/shared/infrastructure/persistence/data_access/config/upload_file_schema");
exports.CelebritySchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    dob: { type: Date, required: false },
    profilePicture: { type: upload_file_schema_1.UploadFileSchema },
    avatar: { type: upload_file_schema_1.UploadFileSchema },
    icons: { type: [upload_file_schema_1.UploadFileSchema] }
});
exports.celebrityModel = mongoose_1.model("Celebrity", exports.CelebritySchema);
