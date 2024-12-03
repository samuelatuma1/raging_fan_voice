export default class SerializationUtility {
    static serializeJson: (data: object) => string | null;
    static deserializeJson<T>(data: string): T | null;
}
