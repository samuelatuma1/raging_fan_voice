import { Chat } from "../../entity/chat";
import { Message } from "../../entity/message";

export default class ChatResponse extends Chat{
    userName: string = "";
    messages: Message[]
}