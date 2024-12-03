
export interface INewsAIService {
    getNewsSummaryForMessage(message: string, celebrityName: string): Promise<string | null>
}
export const IINewsAIService = 'INewsAIService'