import IApiService from "../../../../core/shared/application/contract/services/api/api_service";
import { IPerplexityConfig } from "../config/perplexity_config";
import { INewsAIService } from "../../../../core/ai/application/contract/services/news_ai_service";
export default class NewsAIService implements INewsAIService {
    private readonly apiService;
    private readonly perplexityConfig;
    constructor(apiService: IApiService, perplexityConfig: IPerplexityConfig);
    getNewsSummaryForMessage: (message: string, celebrityName: string) => Promise<string | null>;
}
