"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceChatRequest = exports.TextMessageChatRequest = exports.InitiateChat = void 0;
const chat_type_1 = require("../../enum/chat_type");
class InitiateChat {
    userId;
    celebrityId;
    chatType = chat_type_1.ChatType.private;
    chatId;
}
exports.InitiateChat = InitiateChat;
class TextMessageChatRequest {
    message;
    chatId;
    senderId;
    sentAt;
}
exports.TextMessageChatRequest = TextMessageChatRequest;
class VoiceChatRequest {
    chatId;
    senderId;
    sentAt;
}
exports.VoiceChatRequest = VoiceChatRequest;
//# sourceMappingURL=initiate_chat.js.map