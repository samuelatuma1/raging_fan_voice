import { INewsAIService } from "../../../../core/ai/application/contract/services/news_ai_service";
import IEventTracer from "../../../../core/shared/application/contract/observability/event_tracer";
import { INewsService } from "../contract/services/news_service";
export default class NewsService implements INewsService {
    private readonly newsAIService;
    private readonly eventTracer;
    constructor(newsAIService: INewsAIService, eventTracer: IEventTracer);
    isNewsQuery: (message: string) => Promise<boolean>;
    getNewsUpdateForMessage: (message: string, celebrity: string) => Promise<string>;
}
