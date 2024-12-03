import { IINewsAIService, INewsAIService } from "../../../../core/ai/application/contract/services/news_ai_service";
import IEventTracer, { IIEventTracer } from "../../../../core/shared/application/contract/observability/event_tracer";
import { inject, injectable } from "tsyringe";
import { INewsService } from "../contract/services/news_service";



@injectable()
export default class NewsService implements INewsService{
    public constructor(
        @inject(IINewsAIService) private readonly newsAIService: INewsAIService,
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer
    ){
    }
    isNewsQuery = async (message: string): Promise<boolean> => {
        let newsKeyWords = [
            "latest","news", "updates", "recent", "headlines", "what happened", "what's going on",
             "what is going on", "I heard", "Is it true", "what do you think", "what are your thought", "I heard"]
        let lowerCaseMessage = message.toLowerCase();
        for(let keyword of newsKeyWords){
            let containsNewsKeyword = lowerCaseMessage.includes(keyword.toLowerCase())
            if(containsNewsKeyword){
                return containsNewsKeyword;
            }
        }

        return false;
    }

    getNewsUpdateForMessage = async (message: string, celebrity: string): Promise<string> => {
        const evtTracer = this.eventTracer.instance();
        evtTracer.request = {message, celebrity}
        evtTracer.say("Getting news update")

        let newsSummaryResponse = ""
        try{
            const isNewsQuery = await this.isNewsQuery(message);
            evtTracer.say(`Message is news query: ${isNewsQuery}`)
            if(isNewsQuery){
                newsSummaryResponse = (await this.newsAIService.getNewsSummaryForMessage(message, celebrity)) ?? "";
            }

            evtTracer.isSuccessWithResponseAndMessage(newsSummaryResponse)
            return newsSummaryResponse;
        } catch(ex){
            evtTracer.isErrorWithMessage(ex.message);
            
            return "";
        }
    }
}