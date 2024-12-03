export interface INewsService {
    isNewsQuery(message: string): Promise<boolean>
    getNewsUpdateForMessage(message: string, celebrity: string): Promise<string>
}
export const IINewsService = "INewsService"