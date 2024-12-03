import { AIMessageResponseUnit, AIMessageUnit } from "../../../../core/ai/domain/model/ai_message";
import { IChatGPTConfig } from "../config/chatgpt_config";
import IApiService from "../../../../core/shared/application/contract/services/api/api_service";
import { IConversationAI } from "../../../../core/ai/application/contract/services/conversation_ai_service";
export default class ChatGPTConversationAI implements IConversationAI {
    private readonly apiService;
    private readonly chatgptConfig;
    constructor(apiService: IApiService, chatgptConfig: IChatGPTConfig);
    message: (instruction: AIMessageUnit | string, conversationThread: AIMessageUnit[], userMessage: string) => Promise<AIMessageResponseUnit>;
}
