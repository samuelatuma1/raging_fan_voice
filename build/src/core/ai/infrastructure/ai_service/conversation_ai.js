"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ai_message_enum_1 = require("../../../../core/ai/domain/enum/ai_message_enum");
const ai_message_1 = require("../../../../core/ai/domain/model/ai_message");
const tsyringe_1 = require("tsyringe");
const chatgpt_config_1 = require("../config/chatgpt_config");
const api_service_1 = require("../../../../core/shared/application/contract/services/api/api_service");
const api_request_1 = require("../../../../core/shared/domain/model/api_service/dto/api_request");
const api_request_2 = require("../../../../core/shared/domain/model/api_service/enum/api_request");
let ChatGPTConversationAI = class ChatGPTConversationAI {
    apiService;
    chatgptConfig;
    constructor(apiService, chatgptConfig) {
        this.apiService = apiService;
        this.chatgptConfig = chatgptConfig;
    }
    message = async (instruction, conversationThread, userMessage) => {
        if (typeof (instruction) === "string") {
            instruction = new ai_message_1.AIMessageUnit({
                role: ai_message_enum_1.AIMessageUnitRole.system,
                content: instruction
            });
        }
        conversationThread.unshift(instruction);
        let latestMessage = new ai_message_1.AIMessageUnit({
            role: ai_message_enum_1.AIMessageUnitRole.user,
            content: userMessage
        });
        conversationThread.push(latestMessage);
        let body = {
            model: "gpt-4o-mini",
            messages: conversationThread
        };
        let apiRequestData = new api_request_1.ApiRequest({
            url: `https://api.openai.com/v1/chat/completions`,
            method: api_request_2.ApiRequestMethod.POST,
            headers: {
                authorization: `Bearer ${this.chatgptConfig.key}`,
                contentType: api_request_2.ApiRequestContentType.JSON,
            },
            body: body
        });
        let response = await this.apiService.apiRequest(apiRequestData);
        return response.choices[0];
    };
};
ChatGPTConversationAI = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(api_service_1.IIApiService)),
    __param(1, (0, tsyringe_1.inject)(chatgpt_config_1.IIChatGPTConfig)),
    __metadata("design:paramtypes", [Object, Object])
], ChatGPTConversationAI);
exports.default = ChatGPTConversationAI;
//# sourceMappingURL=conversation_ai.js.map