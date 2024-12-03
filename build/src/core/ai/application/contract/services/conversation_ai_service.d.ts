import { AIMessageResponseUnit, AIMessageUnit } from "../../../../../core/ai/domain/model/ai_message";
export interface IConversationAI {
    message(instruction: AIMessageUnit | string, conversationThread: AIMessageUnit[], userMessage: string): Promise<AIMessageResponseUnit>;
}
export declare const IIConversationAI = "IConversationAI";
