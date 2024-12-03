import { AIMessageUnitRole } from "../../../../core/ai/domain/enum/ai_message_enum";
import { AIMessageResponse, AIMessageUnit } from "../../../../core/ai/domain/model/ai_message";
import IApiService, { IIApiService } from "../../../../core/shared/application/contract/services/api/api_service";
import { ApiRequest } from "../../../../core/shared/domain/model/api_service/dto/api_request";
import { ApiRequestContentType, ApiRequestMethod } from "../../../../core/shared/domain/model/api_service/enum/api_request";
import { inject, injectable } from "tsyringe";
import { IIPerplexityConfig, IPerplexityConfig } from "../config/perplexity_config";
import { INewsAIService } from "../../../../core/ai/application/contract/services/news_ai_service";
import { PerplexityApiRequestBody } from "../../../../core/ai/domain/dto/requests/perplexity_api_request";





@injectable()
export default class NewsAIService implements INewsAIService {
    public constructor(
    @inject(IIApiService) private readonly apiService: IApiService, 
    @inject(IIPerplexityConfig) private readonly perplexityConfig: IPerplexityConfig){

    }

    public getNewsSummaryForMessage = async (message: string, celebrityName: string): Promise<string | null> => {
        let newsSystemConfig = new AIMessageUnit({ role: AIMessageUnitRole.system, content: "Be precise and concise."})
        let messageUnit = new AIMessageUnit({role: AIMessageUnitRole.user, content: `What recent news summary is related to "${message}" for ${celebrityName} `})
        const messages: AIMessageUnit[] = [newsSystemConfig, messageUnit]
        
        let body: PerplexityApiRequestBody = {
            model: "llama-3.1-sonar-small-128k-online",
            messages,
            return_images: false
          }

        let auth = `Bearer ${this.perplexityConfig.key}`
        const apiRequest = new ApiRequest<PerplexityApiRequestBody>({
            url: 'https://api.perplexity.ai/chat/completions',
            method: ApiRequestMethod.POST,
            headers: {
                authorization: auth,
                contentType: ApiRequestContentType.JSON
            },
            body: body
        })
        try{
            let response = await this.apiService.apiRequest<PerplexityApiRequestBody, AIMessageResponse>(apiRequest)
            return response.choices?.[0]?.message?.content;
        } catch(ex){
            console.log(ex)
            return null;
        }
    }
}