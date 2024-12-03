import { RawData, WebSocket } from "ws";
import { IChatLogic } from "./../../core/chat/application/contract/logic/chat_logic.js";
export interface IWebSocketRequest {
    connect: (url?: string, setup?: {
        headers?: {
            [key: string]: string;
        };
    }) => void;
    send(eventName: string, data: {
        [key: string]: any;
    }): boolean;
    close: () => void;
}
declare class WebSocketRequest implements IWebSocketRequest {
    eventHandlers: {
        [key: string]: any;
    };
    nextEventHandlers: {
        [key: string]: any;
    };
    private ws;
    constructor();
    /**
   * Tells us whether or not the WebSocket is connected
   * @returns {boolean}
   */
    isConnected(): boolean;
    connect: (url?: string, setup?: {
        headers?: {
            [key: string]: string;
        };
    }) => WebSocket;
    send: (eventName: string, data?: {
        [key: string]: any;
    }) => boolean;
    on(eventName: string, callback: (data?: any) => void): void;
    manageResponse: (callback: (message: any) => void) => void;
    receive(eventName: string, event: {
        [key: string]: () => void;
    }): boolean;
    dispatch(eventName: string, event: {
        [key: string]: () => void;
    }): boolean;
    close: () => void;
    clearEventHandlers(): boolean;
}
export interface IAIWebSocket {
    relayMessageToOpenAI(data: string | RawData, client: WebSocket): Promise<void>;
    relayEventFromOpenAIToWebsocketServer(server: WebSocket): Promise<void>;
    connect(): void;
}
export declare const IIAIWebSocket = "IAIWebSocket";
export declare class OpenAIWebSocket implements IAIWebSocket {
    wss: WebSocketRequest;
    chatLogic: IChatLogic;
    constructor(chatLogic: IChatLogic);
    relayMessageToOpenAI: (data: string | RawData, client: WebSocket) => Promise<void>;
    connect: () => void;
    reconnect: () => void;
    relayEventFromOpenAIToWebsocketServer: (server: WebSocket) => Promise<void>;
    handleClose: () => void;
}
/**
 * Dispatches websockets to the right handler
 */
export default class WebSocketDispatcher {
    wss: WebSocketRequest;
    openAIWebSocket: OpenAIWebSocket;
    constructor();
}
export {};
