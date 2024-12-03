"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class HashUtility {
    static hashStringWithSha512 = (str, key) => {
        let hmac = (0, crypto_1.createHmac)('sha512', key);
        return hmac.update(str).digest('hex').toString();
    };
}
exports.default = HashUtility;
//# sourceMappingURL=hash_utility.js.map