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
var EventTracer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const logger_1 = require("../../application/contract/observability/logger");
const random_utility_1 = __importDefault(require("../../application/utils/utilities/random_utility"));
const date_utility_1 = __importDefault(require("../../application/utils/utilities/date_utility"));
let EventTracer = EventTracer_1 = class EventTracer {
    logger;
    eventId;
    request;
    response;
    start;
    end;
    timeline;
    verdict;
    counter;
    constructor(logger) {
        this.logger = logger;
        this.eventId = random_utility_1.default.newGuid();
        this.request = null;
        this.start = date_utility_1.default.getUTCNow();
        this.end = date_utility_1.default.getUTCNow();
        this.timeline = {};
        this.verdict = "PENDING";
        this.counter = 0;
        this.response = null;
    }
    addMessageToTimeline(message) {
        this.timeline[this.counter] = message;
        this.counter++;
    }
    getEventTracerObject = () => {
        this.end = date_utility_1.default.getUTCNow();
        return {
            eventid: this.eventId,
            request: this.request,
            start: this.start,
            end: this.end,
            timeline: this.timeline,
            verdict: this.verdict,
            counter: this.counter,
            response: this.response,
            duration: this.end.getTime() - this.start.getTime()
        };
    };
    instance() {
        return new EventTracer_1(this.logger);
    }
    say(message) {
        this.addMessageToTimeline(message);
    }
    resetTracer = () => {
        this.eventId = random_utility_1.default.newGuid();
        this.request = null;
        this.start = date_utility_1.default.getUTCNow();
        this.end = date_utility_1.default.getUTCNow();
        this.timeline = {};
        this.verdict = "PENDING";
        this.counter = 0;
        this.response = null;
    };
    isException = () => {
        this.verdict = "EXCEPTION";
        this.logger.logException(this.eventId, this.getEventTracerObject());
        this.resetTracer();
    };
    isSuccess = () => {
        this.verdict = "SUCCESS";
        this.logger.logInfo(this.eventId, this.getEventTracerObject());
        this.resetTracer();
    };
    isError() {
        this.verdict = "ERROR";
        this.logger.logWarning(this.eventId, this.getEventTracerObject());
        this.resetTracer();
    }
    isSuccessWithResponseAndMessage = (response, message) => {
        this.response = response;
        if (message) {
            this.addMessageToTimeline(message);
        }
        this.isSuccess();
    };
    isExceptionWithMessage(message) {
        this.addMessageToTimeline(message);
        this.isException();
    }
    isSuccessWithMessage(message) {
        this.addMessageToTimeline(message);
        this.isSuccess();
    }
    isErrorWithMessage(message) {
        this.addMessageToTimeline(message);
        this.isError();
    }
};
EventTracer = EventTracer_1 = __decorate([
    (0, tsyringe_1.scoped)(tsyringe_1.Lifecycle.ContainerScoped),
    __param(0, (0, tsyringe_1.inject)(logger_1.IILogger)),
    __metadata("design:paramtypes", [Object])
], EventTracer);
exports.default = EventTracer;
//# sourceMappingURL=event_tracer.js.map