"use strict";
exports.__esModule = true;
exports.messageModel = exports.MessageSchema = void 0;
var mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    chatId: mongoose_1.Schema.Types.ObjectId,
    status: String,
    messageText: String,
    senderId: mongoose_1.Schema.Types.ObjectId,
    messageType: String,
    isAIGenerated: Boolean
});
exports.messageModel = mongoose_1.model("Message", exports.MessageSchema);
