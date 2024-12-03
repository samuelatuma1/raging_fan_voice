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
const news_ai_service_1 = require("../../../../core/ai/application/contract/services/news_ai_service");
const event_tracer_1 = require("../../../../core/shared/application/contract/observability/event_tracer");
const tsyringe_1 = require("tsyringe");
let NewsService = class NewsService {
    newsAIService;
    eventTracer;
    constructor(newsAIService, eventTracer) {
        this.newsAIService = newsAIService;
        this.eventTracer = eventTracer;
    }
    isNewsQuery = async (message) => {
        let newsKeyWords = [
            "latest", "news", "updates", "recent", "headlines", "what happened", "what's going on",
            "what is going on", "I heard", "Is it true", "what do you think", "what are your thought", "I heard"
        ];
        let lowerCaseMessage = message.toLowerCase();
        for (let keyword of newsKeyWords) {
            let containsNewsKeyword = lowerCaseMessage.includes(keyword.toLowerCase());
            if (containsNewsKeyword) {
                return containsNewsKeyword;
            }
        }
        return false;
    };
    getNewsUpdateForMessage = async (message, celebrity) => {
        const evtTracer = this.eventTracer.instance();
        evtTracer.request = { message, celebrity };
        evtTracer.say("Getting news update");
        let newsSummaryResponse = "";
        try {
            const isNewsQuery = await this.isNewsQuery(message);
            evtTracer.say(`Message is news query: ${isNewsQuery}`);
            if (isNewsQuery) {
                newsSummaryResponse = (await this.newsAIService.getNewsSummaryForMessage(message, celebrity)) ?? "";
            }
            evtTracer.isSuccessWithResponseAndMessage(newsSummaryResponse);
            return newsSummaryResponse;
        }
        catch (ex) {
            evtTracer.isErrorWithMessage(ex.message);
            return "";
        }
    };
};
NewsService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(news_ai_service_1.IINewsAIService)),
    __param(1, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __metadata("design:paramtypes", [Object, Object])
], NewsService);
exports.default = NewsService;
//# sourceMappingURL=news_service.js.map