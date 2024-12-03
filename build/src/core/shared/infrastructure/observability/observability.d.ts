import ILogger from "../../application/contract/observability/logger";
export default class Logger implements ILogger {
    logInfo(eventId: any, data: object): void;
    logError(eventId: any, data: object): void;
    logException(eventId: any, data: object): void;
    logWarning(eventId: any, data: object): void;
}
