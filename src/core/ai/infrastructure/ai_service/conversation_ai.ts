import { AIMessageUnitRole } from "../../../../core/ai/domain/enum/ai_message_enum";
import { AIMessageResponse, AIMessageResponseUnit, AIMessageUnit } from "../../../../core/ai/domain/model/ai_message";
import { inject, injectable } from "tsyringe";
import { IChatGPTConfig, IIChatGPTConfig } from "../config/chatgpt_config";
import IApiService, { IIApiService } from "../../../../core/shared/application/contract/services/api/api_service";
import { ApiRequest } from "../../../../core/shared/domain/model/api_service/dto/api_request";
import { ApiRequestContentType, ApiRequestMethod } from "../../../../core/shared/domain/model/api_service/enum/api_request";
import { IConversationAI } from "../../../../core/ai/application/contract/services/conversation_ai_service";
import { ChatGPTApiRequestBody, PerplexityApiRequestBody } from "../../../../core/ai/domain/dto/requests/perplexity_api_request";


@injectable()
export default class ChatGPTConversationAI implements IConversationAI {

    public constructor(
        @inject(IIApiService) private readonly apiService: IApiService,
        @inject(IIChatGPTConfig) private readonly chatgptConfig: IChatGPTConfig
    ){

    }

    message = async (instruction: AIMessageUnit | string, conversationThread: AIMessageUnit[], userMessage: string) : Promise<AIMessageResponseUnit> => {
        
        if(typeof(instruction) === "string"){
            instruction = new AIMessageUnit({
                role: AIMessageUnitRole.system,
                content: instruction
            })
        }
        conversationThread.unshift(instruction)
        let latestMessage = new AIMessageUnit({
            role: AIMessageUnitRole.user,
            content: userMessage
        });

        conversationThread.push(latestMessage);
        let body: ChatGPTApiRequestBody = {
            model: "gpt-4o-mini",
            messages: conversationThread
          }
        
        
        let apiRequestData = new ApiRequest<ChatGPTApiRequestBody>(
            {
                url: `https://api.openai.com/v1/chat/completions`,
                method: ApiRequestMethod.POST,
                headers: {
                    authorization: `Bearer ${this.chatgptConfig.key}`,
                    contentType: ApiRequestContentType.JSON,
                },
                body: body
            }
        )

        let response : AIMessageResponse = await this.apiService.apiRequest<ChatGPTApiRequestBody, AIMessageResponse>(apiRequestData);
        return response.choices[0];
    }

}