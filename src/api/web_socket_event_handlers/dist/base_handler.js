"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.OpenAIWebSocket = exports.IIAIWebSocket = void 0;
var tsyringe_1 = require("tsyringe");
var ws_1 = require("ws");
// import decodeAudio from 'audio-decode';
var random_utility_js_1 = require("./../../core/shared/application/utils/utilities/random_utility.js");
var chat_logic_js_1 = require("./../../core/chat/application/contract/logic/chat_logic.js");
var initiate_chat_js_1 = require("./../../core/chat/domain/dto/requests/initiate_chat.js");
var mongoose_1 = require("mongoose");
console.log({ token: process.env.open_ai_key });
var WebSocketRequest = /** @class */ (function () {
    function WebSocketRequest() {
        var _this = this;
        this.connect = function (url, setup) {
            if (setup === void 0) { setup = {}; }
            _this.ws = new ws_1.WebSocket(url, setup);
            _this.ws.on("open", function open() {
                console.log("Running Web Socket " + url + " ");
            });
            return _this.ws;
        };
        this.send = function (eventName, data) {
            if (!_this.isConnected()) {
                return false;
            }
            data = data !== null && data !== void 0 ? data : {};
            var event = __assign({ event_id: "EVT_" + random_utility_js_1["default"].newGuid(), type: eventName }, data);
            _this.ws.send(JSON.stringify(event));
            //   console.log({event});
            return true;
        };
        this.manageResponse = function (callback) {
            _this.ws.on("message", callback);
        };
        this.close = function () {
            var _a;
            (_a = _this.ws) === null || _a === void 0 ? void 0 : _a.close();
        };
        this.eventHandlers = {};
        this.nextEventHandlers = {};
    }
    /**
   * Tells us whether or not the WebSocket is connected
   * @returns {boolean}
   */
    WebSocketRequest.prototype.isConnected = function () {
        return this.ws && this.ws.readyState === ws_1.WebSocket.OPEN;
    };
    WebSocketRequest.prototype.on = function (eventName, callback) {
        // this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
        // this.eventHandlers[eventName].push(callback);
        this.ws.on(eventName, callback);
        // return callback;
    };
    WebSocketRequest.prototype.receive = function (eventName, event) {
        console.log("received:", eventName, event);
        this.dispatch("server." + eventName, event);
        this.dispatch('server.*', event);
        return true;
    };
    WebSocketRequest.prototype.dispatch = function (eventName, event) {
        var handlers = [].concat(this.eventHandlers[eventName] || []);
        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
            var handler = handlers_1[_i];
            handler(event);
        }
        var nextHandlers = [].concat(this.nextEventHandlers[eventName] || []);
        for (var _a = 0, nextHandlers_1 = nextHandlers; _a < nextHandlers_1.length; _a++) {
            var nextHandler = nextHandlers_1[_a];
            nextHandler(event);
        }
        delete this.nextEventHandlers[eventName];
        return true;
    };
    WebSocketRequest.prototype.clearEventHandlers = function () {
        this.eventHandlers = {};
        this.nextEventHandlers = {};
        return true;
    };
    return WebSocketRequest;
}());
exports.IIAIWebSocket = "IAIWebSocket";
var OpenAIWebSocket = /** @class */ (function () {
    function OpenAIWebSocket(chatLogic) {
        var _this = this;
        this.relayMessageToOpenAI = function (data, client) { return __awaiter(_this, void 0, Promise, function () {
            var event, _a, chatId, senderId, voiceChat, sessionInstruction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.connect();
                        if (!this.wss.isConnected()) {
                            throw new Error("Wss server not connected");
                        }
                        event = JSON.parse(data.toString());
                        console.log("Relaying \"" + event.type + "\" to OpenAI");
                        if (!(event.type === "session.update")) return [3 /*break*/, 2];
                        _a = event.session.instructions.split(":"), chatId = _a[0], senderId = _a[1];
                        voiceChat = new initiate_chat_js_1.VoiceChatRequest();
                        voiceChat.chatId = new mongoose_1.Types.ObjectId(chatId);
                        voiceChat.senderId = new mongoose_1.Types.ObjectId(senderId);
                        return [4 /*yield*/, this.chatLogic.getVoiceCallInstructionForChat(voiceChat)];
                    case 1:
                        sessionInstruction = _b.sent();
                        event.session.instructions = sessionInstruction;
                        console.log({ event: event });
                        _b.label = 2;
                    case 2:
                        if (event.type === "response.create") {
                        }
                        this.wss.send(event.type, event);
                        return [2 /*return*/];
                }
            });
        }); };
        this.connect = function () {
            var _a;
            if (!((_a = _this.wss) === null || _a === void 0 ? void 0 : _a.isConnected())) {
                var wss = new WebSocketRequest();
                wss.connect("wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01", {
                    headers: {
                        "Authorization": "Bearer " + process.env.open_ai_key,
                        "OpenAI-Beta": "realtime=v1"
                    }
                });
                _this.wss = wss;
                // this.handleMessage();
                _this.wss.on('error', function (error) {
                    console.log({ error: error });
                });
            }
        };
        this.relayEventFromOpenAIToWebsocketServer = function (server) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                this.connect();
                if (!this.wss.isConnected()) {
                    throw new Error("Wss server not connected");
                }
                this.wss.on('message', function (data) {
                    // console.log("relayEventFromOpenAIToWebsocketServer")
                    var event = JSON.parse(data.toString());
                    event.originatedFrom = "OPENAI";
                    console.log("Relaying message \"" + event.type + "\" from OpenAI");
                    // console.log({event})
                    if (event.type === "error") {
                        console.log({ event: event });
                    }
                    server.send(JSON.stringify(event));
                });
                return [2 /*return*/];
            });
        }); };
        this.handleClose = function () {
            _this.wss.close();
            console.log("Disconnected");
            _this.wss.dispatch('close', { error: function () { } });
        };
        this.chatLogic = chatLogic;
        this.connect();
    }
    OpenAIWebSocket = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(chat_logic_js_1.IIChatLogic))
    ], OpenAIWebSocket);
    return OpenAIWebSocket;
}());
exports.OpenAIWebSocket = OpenAIWebSocket;
/**
 * Dispatches websockets to the right handler
 */
var WebSocketDispatcher = /** @class */ (function () {
    function WebSocketDispatcher() {
        // var openAIWebSocket = new OpenAIWebSocket();
        // this.openAIWebSocket = openAIWebSocket;
    }
    WebSocketDispatcher = __decorate([
        tsyringe_1.injectable()
    ], WebSocketDispatcher);
    return WebSocketDispatcher;
}());
exports["default"] = WebSocketDispatcher;
