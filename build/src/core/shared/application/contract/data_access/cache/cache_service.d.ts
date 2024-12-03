export default interface ICacheService {
    addAsync(key: string, value: any, durationInSeconds: number): Promise<boolean>;
    getAsync<T>(key: string): Promise<T | null>;
    deleteAsync(key: string): Promise<boolean>;
}
export declare const IICacheService = "ICacheService";
