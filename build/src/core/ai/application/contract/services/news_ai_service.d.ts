export interface INewsAIService {
    getNewsSummaryForMessage(message: string, celebrityName: string): Promise<string | null>;
}
export declare const IINewsAIService = "INewsAIService";
