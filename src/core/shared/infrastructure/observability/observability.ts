import { injectable } from "tsyringe";
import ILogger from "../../application/contract/observability/logger";

@injectable()
export default class Logger implements ILogger{
    logInfo(eventId: any, data: object): void {
        console.log({eventId, data});
    }
    logError(eventId: any, data: object): void {
        console.error({eventId, data});
    }
    logException(eventId: any, data: object): void {
        console.error({eventId, data});
    }
    logWarning(eventId: any, data: object): void {
        console.error({eventId, data})
    }
    
}