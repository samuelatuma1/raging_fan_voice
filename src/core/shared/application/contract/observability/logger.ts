export default interface ILogger {
    logInfo(eventId: any, data: object): void;
    logError(eventId: any, data: object): void;
    logException(eventId: any, data: object): void;
    logWarning(eventId: any, data: object): void;
}

export const IILogger = "ILogger";