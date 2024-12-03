"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UploadFileSchema = new mongoose_1.Schema({
    resource_type: String,
    secure_url: String,
    public_id: String,
    folder: String,
    name: String
});
//# sourceMappingURL=upload_file_schema.js.map