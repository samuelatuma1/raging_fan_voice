"use strict";
exports.__esModule = true;
exports.UploadFileSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UploadFileSchema = new mongoose_1.Schema({
    resource_type: String,
    secure_url: String,
    public_id: String,
    folder: String,
    name: String
});
