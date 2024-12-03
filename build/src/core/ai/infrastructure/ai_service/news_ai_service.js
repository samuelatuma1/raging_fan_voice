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
const api_service_1 = require("../../../../core/shared/application/contract/services/api/api_service");
const api_request_1 = require("../../../../core/shared/domain/model/api_service/dto/api_request");
const api_request_2 = require("../../../../core/shared/domain/model/api_service/enum/api_request");
const tsyringe_1 = require("tsyringe");
const perplexity_config_1 = require("../config/perplexity_config");
let NewsAIService = class NewsAIService {
    apiService;
    perplexityConfig;
    constructor(apiService, perplexityConfig) {
        this.apiService = apiService;
        this.perplexityConfig = perplexityConfig;
    }
    getNewsSummaryForMessage = async (message, celebrityName) => {
        let newsSystemConfig = new ai_message_1.AIMessageUnit({ role: ai_message_enum_1.AIMessageUnitRole.system, content: "Be precise and concise." });
        let messageUnit = new ai_message_1.AIMessageUnit({ role: ai_message_enum_1.AIMessageUnitRole.user, content: `What recent news summary is related to "${message}" for ${celebrityName} ` });
        const messages = [newsSystemConfig, messageUnit];
        let body = {
            model: "llama-3.1-sonar-small-128k-online",
            messages,
            return_images: false
        };
        let auth = `Bearer ${this.perplexityConfig.key}`;
        const apiRequest = new api_request_1.ApiRequest({
            url: 'https://api.perplexity.ai/chat/completions',
            method: api_request_2.ApiRequestMethod.POST,
            headers: {
                authorization: auth,
                contentType: api_request_2.ApiRequestContentType.JSON
            },
            body: body
        });
        try {
            let response = await this.apiService.apiRequest(apiRequest);
            return response.choices?.[0]?.message?.content;
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    };
};
NewsAIService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(api_service_1.IIApiService)),
    __param(1, (0, tsyringe_1.inject)(perplexity_config_1.IIPerplexityConfig)),
    __metadata("design:paramtypes", [Object, Object])
], NewsAIService);
exports.default = NewsAIService;
//# sourceMappingURL=news_ai_service.js.map