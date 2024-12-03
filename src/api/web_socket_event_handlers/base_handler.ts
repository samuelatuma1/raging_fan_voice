import { inject, injectable } from "tsyringe";
import { RawData, WebSocket, Server } from "ws";
import fs from 'fs';
// import decodeAudio from 'audio-decode';
import RandomUtility from "./../../core/shared/application/utils/utilities/random_utility.js";
import { IChatLogic, IIChatLogic } from "./../../core/chat/application/contract/logic/chat_logic.js";
import { VoiceChatRequest } from "./../../core/chat/domain/dto/requests/initiate_chat.js";
import { Types } from "mongoose";

console.log({token: process.env.open_ai_key})



export interface IWebSocketRequest {
    connect: (url?: string, setup?: {
        headers?: {
            [key: string]: string;
        };
    }) => void;
    send (eventName: string, data: {[key: string]: any}): boolean
    close: () => void;
}
class WebSocketRequest implements IWebSocketRequest{

    eventHandlers: {[key: string]: any}
    nextEventHandlers: {[key: string]: any}
    private ws: WebSocket;

    public constructor(){
        this.eventHandlers = {};
        this.nextEventHandlers = {};
    }
    /**
   * Tells us whether or not the WebSocket is connected
   * @returns {boolean}
   */
    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }
    connect = (url?: string, setup: {headers?: {[key: string]: string}} = {}) => {
        this.ws = new WebSocket(url, setup)

        this.ws.on("open", function open(){
            console.log(`Running Web Socket ${url} `)
        })

        return this.ws;
    }

    send = (eventName: string, data?: {[key: string]: any}): boolean => {
        if(!this.isConnected()){
            return false;
        }
        data = data ?? {};
        const event = {
            event_id: `EVT_${RandomUtility.newGuid()}`,
            type: eventName,
            ...data,
          };

          this.ws.send(JSON.stringify(event))
        //   console.log({event});
          return true;
    }

    on(eventName: string, callback: (data?: any) => void) {
        // this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
        // this.eventHandlers[eventName].push(callback);
        this.ws.on(eventName, callback);
        // return callback;
      }

    manageResponse = (callback: (message: any) => void) => {
        this.ws.on("message", callback);
    }



    receive(eventName: string, event:  {[key: string]: () => void}) {
        console.log(`received:`, eventName, event);
        this.dispatch(`server.${eventName}`, event);
        this.dispatch('server.*', event);
        return true;
    }


    dispatch(eventName: string, event: {[key: string]: () => void}) {
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
    }

    clearEventHandlers() {
        this.eventHandlers = {};
        this.nextEventHandlers = {};
        return true;
      }
}
export interface IAIWebSocket{
    relayMessageToOpenAI(data: string | RawData, client: WebSocket): Promise<void> 
    relayEventFromOpenAIToWebsocketServer(server: WebSocket): Promise<void> 
    connect(): void
}

export const IIAIWebSocket = "IAIWebSocket"

@injectable()
export class OpenAIWebSocket implements IAIWebSocket {
    wss: WebSocketRequest;
    chatLogic: IChatLogic
    public constructor(@inject(IIChatLogic) chatLogic: IChatLogic){
        this.chatLogic = chatLogic;
        this.connect();
    }

    relayMessageToOpenAI = async (data: string | RawData, client: WebSocket): Promise<void> => {
        this.connect();
        if(!this.wss.isConnected()){
            throw new Error("Wss server not connected")
        }
        const event = JSON.parse(data.toString());

        console.log(`Relaying "${event.type}" to OpenAI`);
        if(event.type === "session.update"){
            let [chatId, senderId] = event.session.instructions.split(":")
            // console.log({chatId, senderId, test: "here"})
            let voiceChat = new VoiceChatRequest()
            voiceChat.chatId = new Types.ObjectId(chatId);
            voiceChat.senderId = new Types.ObjectId(senderId);
            let sessionInstruction = await this.chatLogic.getVoiceCallInstructionForChat(voiceChat)
            
            event.session.instructions = sessionInstruction;
            if(event.session?.voice_chat){
                delete event.session.voice_chat
            }
            console.log({event})
        }
        if(event.type === "response.create"){
            
        }
        this.wss.send(event.type, event);
    }

    connect = (): void => {
        if(!this.wss?.isConnected()){
            let wss = new WebSocketRequest();
                wss.connect("wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01", 
                {
                    headers: {
                        "Authorization": "Bearer " + process.env.open_ai_key,
                        "OpenAI-Beta": "realtime=v1",
                    }
                }
            )
            this.wss = wss
        // this.handleMessage();
            this.wss.on('error', (error) => {
                console.log({error})
            })
        }

    }

    reconnect = (): void => {
        if (this.wss) {
            this.wss.close();
        }
        setTimeout(() => {
            console.log("Reconnecting WebSocket...");
            this.connect();
        }, 1000); // Reconnect after 1 second
    };

    relayEventFromOpenAIToWebsocketServer = async (server: WebSocket): Promise<void> => {
        this.connect()
        if(!this.wss.isConnected()){
            throw new Error("Wss server not connected")
        }
        
        this.wss.on('message', (data) => {
            console.log("relayEventFromOpenAIToWebsocketServer")
            const event = JSON.parse(data.toString());
            event.originatedFrom = "OPENAI"
            console.log(`Relaying message "${event.type}" from OpenAI`);
            // console.log({event})
            if(event.type === "error"){
                console.log({...event, _ERROR: "OpenAI error"});
                if (event.error?.code === "session_expired") {
                    console.log("Session expired. Reconnecting...");
                    this.reconnect();
                }
            }
            server.send(JSON.stringify(event))
        });
    }

    handleClose = () => {
        this.wss.close();
        console.log(`Disconnected`);
        this.wss.dispatch('close', { error: () => {} });
    }
    
}


/**
 * Dispatches websockets to the right handler
 */
@injectable()
export default class WebSocketDispatcher{
    wss: WebSocketRequest;
    openAIWebSocket: OpenAIWebSocket
    public constructor(){
        // var openAIWebSocket = new OpenAIWebSocket();
        // this.openAIWebSocket = openAIWebSocket;
    }
    
}