"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var tsyringe_1 = require("tsyringe");
var base_controller_1 = require("./base_controller");
var celebrity_logic_1 = require("../../core/raging_fan/application/contract/logic/celebrity_logic");
var serialization_utility_1 = require("../../core/shared/application/utils/utilities/serialization_utility");
var news_ai_service_1 = require("../../core/ai/application/contract/services/news_ai_service");
var chat_logic_1 = require("../../core/chat/application/contract/logic/chat_logic");
var CelebrityController = /** @class */ (function (_super) {
    __extends(CelebrityController, _super);
    function CelebrityController(celebrityLogic, newsAIService, chatLogic) {
        var _this = _super.call(this) || this;
        _this.celebrityLogic = celebrityLogic;
        _this.newsAIService = newsAIService;
        _this.chatLogic = chatLogic;
        _this.createCelebrity = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var imgUpload, avatar, icons, reqBody, response, ex_1;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        imgUpload = (_a = this.convertReqFilesToUploadFiles(req, 'image')[0]) !== null && _a !== void 0 ? _a : null;
                        avatar = (_b = this.convertReqFilesToUploadFiles(req, 'avatar')[0]) !== null && _b !== void 0 ? _b : null;
                        icons = (_c = this.convertReqFilesToUploadFiles(req, 'icons')) !== null && _c !== void 0 ? _c : [];
                        reqBody = serialization_utility_1["default"].deserializeJson(req.body.data);
                        reqBody.profilePicture = imgUpload;
                        reqBody.avatar = avatar;
                        reqBody.icons = icons;
                        return [4 /*yield*/, this.celebrityLogic.createCelebrity(reqBody)];
                    case 1:
                        response = _d.sent();
                        console.log({ response: response });
                        res.json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _d.sent();
                        next(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.trainCelebrity = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var response, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.celebrityLogic.trainCelebrity(req.body)];
                    case 1:
                        response = _a.sent();
                        res.json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        next(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getCelebrities = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var response, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.celebrityLogic.getCelebrities(req.query)];
                    case 1:
                        response = _a.sent();
                        console.log({ response: response });
                        res.json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.testAINews = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var news, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.newsAIService.getNewsSummaryForMessage(req.body.message, 'Lionel Messi')];
                    case 1:
                        news = _a.sent();
                        res.json({ news: news });
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.initiateChat = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var chatResponse, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.chatLogic.startChat(req.body)];
                    case 1:
                        chatResponse = _a.sent();
                        res.json(chatResponse);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.chat = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var chatResponse, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.chatLogic.respondToTextMessage(req.body)];
                    case 1:
                        chatResponse = _a.sent();
                        res.json(chatResponse);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    CelebrityController = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(celebrity_logic_1.IICelebrityLogic)),
        __param(1, tsyringe_1.inject(news_ai_service_1.IINewsAIService)),
        __param(2, tsyringe_1.inject(chat_logic_1.IIChatLogic))
    ], CelebrityController);
    return CelebrityController;
}(base_controller_1["default"]));
exports["default"] = CelebrityController;
