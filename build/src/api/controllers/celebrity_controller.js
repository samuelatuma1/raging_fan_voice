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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const base_controller_1 = __importDefault(require("./base_controller"));
const celebrity_logic_1 = require("../../core/raging_fan/application/contract/logic/celebrity_logic");
const serialization_utility_1 = __importDefault(require("../../core/shared/application/utils/utilities/serialization_utility"));
const news_ai_service_1 = require("../../core/ai/application/contract/services/news_ai_service");
const chat_logic_1 = require("../../core/chat/application/contract/logic/chat_logic");
let CelebrityController = class CelebrityController extends base_controller_1.default {
    celebrityLogic;
    newsAIService;
    chatLogic;
    constructor(celebrityLogic, newsAIService, chatLogic) {
        super();
        this.celebrityLogic = celebrityLogic;
        this.newsAIService = newsAIService;
        this.chatLogic = chatLogic;
    }
    createCelebrity = async (req, res, next) => {
        try {
            const imgUpload = this.convertReqFilesToUploadFiles(req, 'image')[0] ?? null;
            const avatar = this.convertReqFilesToUploadFiles(req, 'avatar')[0] ?? null;
            const icons = this.convertReqFilesToUploadFiles(req, 'icons') ?? [];
            let reqBody = serialization_utility_1.default.deserializeJson(req.body.data);
            reqBody.profilePicture = imgUpload;
            reqBody.avatar = avatar;
            reqBody.icons = icons;
            let response = await this.celebrityLogic.createCelebrity(reqBody);
            console.log({ response });
            res.json(response);
        }
        catch (ex) {
            next(ex);
        }
    };
    trainCelebrity = async (req, res, next) => {
        try {
            let response = await this.celebrityLogic.trainCelebrity(req.body);
            res.json(response);
        }
        catch (ex) {
            next(ex);
        }
    };
    getCelebrities = async (req, res, next) => {
        try {
            let response = await this.celebrityLogic.getCelebrities(req.query);
            console.log({ response });
            res.json(response);
        }
        catch (ex) {
        }
    };
    testAINews = async (req, res, next) => {
        try {
            let news = await this.newsAIService.getNewsSummaryForMessage(req.body.message, 'Lionel Messi');
            res.json({ news });
        }
        catch (ex) {
        }
    };
    initiateChat = async (req, res, next) => {
        try {
            let chatResponse = await this.chatLogic.startChat(req.body);
            res.json(chatResponse);
        }
        catch (ex) {
        }
    };
    chat = async (req, res, next) => {
        try {
            let chatResponse = await this.chatLogic.respondToTextMessage(req.body);
            res.json(chatResponse);
        }
        catch (ex) {
        }
    };
};
CelebrityController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(celebrity_logic_1.IICelebrityLogic)),
    __param(1, (0, tsyringe_1.inject)(news_ai_service_1.IINewsAIService)),
    __param(2, (0, tsyringe_1.inject)(chat_logic_1.IIChatLogic)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CelebrityController);
exports.default = CelebrityController;
//# sourceMappingURL=celebrity_controller.js.map