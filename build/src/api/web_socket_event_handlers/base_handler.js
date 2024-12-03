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
exports.OpenAIWebSocket = exports.IIAIWebSocket = void 0;
const tsyringe_1 = require("tsyringe");
const ws_1 = require("ws");
// import decodeAudio from 'audio-decode';
const random_utility_js_1 = __importDefault(require("./../../core/shared/application/utils/utilities/random_utility.js"));
const chat_logic_js_1 = require("./../../core/chat/application/contract/logic/chat_logic.js");
const initiate_chat_js_1 = require("./../../core/chat/domain/dto/requests/initiate_chat.js");
const mongoose_1 = require("mongoose");
console.log({ token: process.env.open_ai_key });
class WebSocketRequest {
    eventHandlers;
    nextEventHandlers;
    ws;
    constructor() {
        this.eventHandlers = {};
        this.nextEventHandlers = {};
    }
    /**
   * Tells us whether or not the WebSocket is connected
   * @returns {boolean}
   */
    isConnected() {
        return this.ws && this.ws.readyState === ws_1.WebSocket.OPEN;
    }
    connect = (url, setup = {}) => {
        this.ws = new ws_1.WebSocket(url, setup);
        this.ws.on("open", function open() {
            console.log(`Running Web Socket ${url} `);
        });
        return this.ws;
    };
    send = (eventName, data) => {
        if (!this.isConnected()) {
            return false;
        }
        data = data ?? {};
        const event = {
            event_id: `EVT_${random_utility_js_1.default.newGuid()}`,
            type: eventName,
            ...data,
        };
        this.ws.send(JSON.stringify(event));
        //   console.log({event});
        return true;
    };
    on(eventName, callback) {
        // this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
        // this.eventHandlers[eventName].push(callback);
        this.ws.on(eventName, callback);
        // return callback;
    }
    manageResponse = (callback) => {
        this.ws.on("message", callback);
    };
    receive(eventName, event) {
        console.log(`received:`, eventName, event);
        this.dispatch(`server.${eventName}`, event);
        this.dispatch('server.*', event);
        return true;
    }
    dispatch(eventName, event) {
        const handlers = [].concat(this.eventHandlers[eventName] || []);
        for (const handler of handlers) {
            handler(event);
        }
        const nextHandlers = [].concat(this.nextEventHandlers[eventName] || []);
        for (const nextHandler of nextHandlers) {
            nextHandler(event);
        }
        delete this.nextEventHandlers[eventName];
        return true;
    }
    close = () => {
        this.ws?.close();
    };
    clearEventHandlers() {
        this.eventHandlers = {};
        this.nextEventHandlers = {};
        return true;
    }
}
exports.IIAIWebSocket = "IAIWebSocket";
let OpenAIWebSocket = class OpenAIWebSocket {
    wss;
    chatLogic;
    constructor(chatLogic) {
        this.chatLogic = chatLogic;
        this.connect();
    }
    relayMessageToOpenAI = async (data, client) => {
        this.connect();
        if (!this.wss.isConnected()) {
            throw new Error("Wss server not connected");
        }
        const event = JSON.parse(data.toString());
        console.log(`Relaying "${event.type}" to OpenAI`);
        if (event.type === "session.update") {
            let [chatId, senderId] = event.session.instructions.split(":");
            // console.log({chatId, senderId, test: "here"})
            let voiceChat = new initiate_chat_js_1.VoiceChatRequest();
            voiceChat.chatId = new mongoose_1.Types.ObjectId(chatId);
            voiceChat.senderId = new mongoose_1.Types.ObjectId(senderId);
            let sessionInstruction = await this.chatLogic.getVoiceCallInstructionForChat(voiceChat);
            event.session.instructions = sessionInstruction;
            console.log({ event });
        }
        if (event.type === "response.create") {
        }
        this.wss.send(event.type, event);
    };
    connect = () => {
        if (!this.wss?.isConnected()) {
            let wss = new WebSocketRequest();
            wss.connect("wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01", {
                headers: {
                    "Authorization": "Bearer " + process.env.open_ai_key,
                    "OpenAI-Beta": "realtime=v1",
                }
            });
            this.wss = wss;
            // this.handleMessage();
            this.wss.on('error', (error) => {
                console.log({ error });
            });
        }
    };
    reconnect = () => {
        if (this.wss) {
            this.wss.close();
        }
        setTimeout(() => {
            console.log("Reconnecting WebSocket...");
            this.connect();
        }, 1000); // Reconnect after 1 second
    };
    relayEventFromOpenAIToWebsocketServer = async (server) => {
        this.connect();
        if (!this.wss.isConnected()) {
            throw new Error("Wss server not connected");
        }
        this.wss.on('message', (data) => {
            console.log("relayEventFromOpenAIToWebsocketServer");
            const event = JSON.parse(data.toString());
            event.originatedFrom = "OPENAI";
            console.log(`Relaying message "${event.type}" from OpenAI`);
            // console.log({event})
            if (event.type === "error") {
                console.log({ ...event, _ERROR: "OpenAI error" });
                if (event.error?.code === "session_expired") {
                    console.log("Session expired. Reconnecting...");
                    this.reconnect();
                }
            }
            server.send(JSON.stringify(event));
        });
    };
    handleClose = () => {
        this.wss.close();
        console.log(`Disconnected`);
        this.wss.dispatch('close', { error: () => { } });
    };
};
exports.OpenAIWebSocket = OpenAIWebSocket;
exports.OpenAIWebSocket = OpenAIWebSocket = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(chat_logic_js_1.IIChatLogic)),
    __metadata("design:paramtypes", [Object])
], OpenAIWebSocket);
/**
 * Dispatches websockets to the right handler
 */
let WebSocketDispatcher = class WebSocketDispatcher {
    wss;
    openAIWebSocket;
    constructor() {
        // var openAIWebSocket = new OpenAIWebSocket();
        // this.openAIWebSocket = openAIWebSocket;
    }
};
WebSocketDispatcher = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], WebSocketDispatcher);
exports.default = WebSocketDispatcher;
//# sourceMappingURL=base_handler.js.map