"use strict";
exports.__esModule = true;
exports.VoiceChatRequest = exports.TextMessageChatRequest = exports.InitiateChat = void 0;
var chat_type_1 = require("../../enum/chat_type");
var InitiateChat = /** @class */ (function () {
    function InitiateChat() {
        this.chatType = chat_type_1.ChatType.private;
    }
    return InitiateChat;
}());
exports.InitiateChat = InitiateChat;
var TextMessageChatRequest = /** @class */ (function () {
    function TextMessageChatRequest() {
    }
    return TextMessageChatRequest;
}());
exports.TextMessageChatRequest = TextMessageChatRequest;
var VoiceChatRequest = /** @class */ (function () {
    function VoiceChatRequest() {
    }
    return VoiceChatRequest;
}());
exports.VoiceChatRequest = VoiceChatRequest;
