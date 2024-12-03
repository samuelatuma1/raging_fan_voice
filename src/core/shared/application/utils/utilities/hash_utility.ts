import { createHash, createHmac } from "crypto"
export default class HashUtility {
    static hashStringWithSha512 = (str: string, key: string): string => {
        let hmac = createHmac('sha512', key);
        return hmac.update(str).digest('hex').toString();
    }
}