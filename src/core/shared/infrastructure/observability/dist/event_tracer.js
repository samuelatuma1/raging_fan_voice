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
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var logger_1 = require("../../application/contract/observability/logger");
var random_utility_1 = require("../../application/utils/utilities/random_utility");
var date_utility_1 = require("../../application/utils/utilities/date_utility");
var EventTracer = /** @class */ (function () {
    function EventTracer(logger) {
        var _this = this;
        this.logger = logger;
        this.getEventTracerObject = function () {
            _this.end = date_utility_1["default"].getUTCNow();
            return {
                eventid: _this.eventId,
                request: _this.request,
                start: _this.start,
                end: _this.end,
                timeline: _this.timeline,
                verdict: _this.verdict,
                counter: _this.counter,
                response: _this.response,
                duration: _this.end.getTime() - _this.start.getTime()
            };
        };
        this.resetTracer = function () {
            _this.eventId = random_utility_1["default"].newGuid();
            _this.request = null;
            _this.start = date_utility_1["default"].getUTCNow();
            _this.end = date_utility_1["default"].getUTCNow();
            _this.timeline = {};
            _this.verdict = "PENDING";
            _this.counter = 0;
            _this.response = null;
        };
        this.isException = function () {
            _this.verdict = "EXCEPTION";
            _this.logger.logException(_this.eventId, _this.getEventTracerObject());
            _this.resetTracer();
        };
        this.isSuccess = function () {
            _this.verdict = "SUCCESS";
            _this.logger.logInfo(_this.eventId, _this.getEventTracerObject());
            _this.resetTracer();
        };
        this.isSuccessWithResponseAndMessage = function (response, message) {
            _this.response = response;
            if (message) {
                _this.addMessageToTimeline(message);
            }
            _this.isSuccess();
        };
        this.eventId = random_utility_1["default"].newGuid();
        this.request = null;
        this.start = date_utility_1["default"].getUTCNow();
        this.end = date_utility_1["default"].getUTCNow();
        this.timeline = {};
        this.verdict = "PENDING";
        this.counter = 0;
        this.response = null;
    }
    EventTracer_1 = EventTracer;
    EventTracer.prototype.addMessageToTimeline = function (message) {
        this.timeline[this.counter] = message;
        this.counter++;
    };
    EventTracer.prototype.instance = function () {
        return new EventTracer_1(this.logger);
    };
    EventTracer.prototype.say = function (message) {
        this.addMessageToTimeline(message);
    };
    EventTracer.prototype.isError = function () {
        this.verdict = "ERROR";
        this.logger.logWarning(this.eventId, this.getEventTracerObject());
        this.resetTracer();
    };
    EventTracer.prototype.isExceptionWithMessage = function (message) {
        this.addMessageToTimeline(message);
        this.isException();
    };
    EventTracer.prototype.isSuccessWithMessage = function (message) {
        this.addMessageToTimeline(message);
        this.isSuccess();
    };
    EventTracer.prototype.isErrorWithMessage = function (message) {
        this.addMessageToTimeline(message);
        this.isError();
    };
    var EventTracer_1;
    EventTracer = EventTracer_1 = __decorate([
        tsyringe_1.scoped(tsyringe_1.Lifecycle.ContainerScoped),
        __param(0, tsyringe_1.inject(logger_1.IILogger))
    ], EventTracer);
    return EventTracer;
}());
exports["default"] = EventTracer;
