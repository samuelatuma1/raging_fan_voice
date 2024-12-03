"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIMessageResponse = exports.AIMessageResponseUnit = exports.AIMessageUnit = void 0;
const ai_message_enum_1 = require("../enum/ai_message_enum");
class AIMessageUnit {
    role = ai_message_enum_1.AIMessageUnitRole.user;
    content;
    constructor(init) {
        this.role = init.role ?? ai_message_enum_1.AIMessageUnitRole.user;
        this.content = init.content ?? init.content;
    }
}
exports.AIMessageUnit = AIMessageUnit;
class AIMessageResponseUnit {
    finish_reason;
    message;
}
exports.AIMessageResponseUnit = AIMessageResponseUnit;
class AIMessageResponse {
    choices;
    model;
}
exports.AIMessageResponse = AIMessageResponse;
//# sourceMappingURL=ai_message.js.map