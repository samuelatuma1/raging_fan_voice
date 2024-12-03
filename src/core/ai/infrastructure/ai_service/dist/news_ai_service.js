"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ai_message_enum_1 = require("../../../../core/ai/domain/enum/ai_message_enum");
var ai_message_1 = require("../../../../core/ai/domain/model/ai_message");
var api_service_1 = require("../../../../core/shared/application/contract/services/api/api_service");
var api_request_1 = require("../../../../core/shared/domain/model/api_service/dto/api_request");
var api_request_2 = require("../../../../core/shared/domain/model/api_service/enum/api_request");
var tsyringe_1 = require("tsyringe");
var perplexity_config_1 = require("../config/perplexity_config");
var NewsAIService = /** @class */ (function () {
    function NewsAIService(apiService, perplexityConfig) {
        var _this = this;
        this.apiService = apiService;
        this.perplexityConfig = perplexityConfig;
        this.getNewsSummaryForMessage = function (message, celebrityName) { return __awaiter(_this, void 0, Promise, function () {
            var newsSystemConfig, messageUnit, messages, body, auth, apiRequest, response, ex_1;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        newsSystemConfig = new ai_message_1.AIMessageUnit({ role: ai_message_enum_1.AIMessageUnitRole.system, content: "Be precise and concise." });
                        messageUnit = new ai_message_1.AIMessageUnit({ role: ai_message_enum_1.AIMessageUnitRole.user, content: "What recent news summary is related to \"" + message + "\" for " + celebrityName + " " });
                        messages = [newsSystemConfig, messageUnit];
                        body = {
                            model: "llama-3.1-sonar-small-128k-online",
                            messages: messages,
                            return_images: false
                        };
                        auth = "Bearer " + this.perplexityConfig.key;
                        apiRequest = new api_request_1.ApiRequest({
                            url: 'https://api.perplexity.ai/chat/completions',
                            method: api_request_2.ApiRequestMethod.POST,
                            headers: {
                                authorization: auth,
                                contentType: api_request_2.ApiRequestContentType.JSON
                            },
                            body: body
                        });
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.apiService.apiRequest(apiRequest)];
                    case 2:
                        response = _d.sent();
                        return [2 /*return*/, (_c = (_b = (_a = response.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content];
                    case 3:
                        ex_1 = _d.sent();
                        console.log(ex_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    NewsAIService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(api_service_1.IIApiService)),
        __param(1, tsyringe_1.inject(perplexity_config_1.IIPerplexityConfig))
    ], NewsAIService);
    return NewsAIService;
}());
exports["default"] = NewsAIService;
