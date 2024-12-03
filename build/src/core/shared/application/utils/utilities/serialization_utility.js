"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SerializationUtility {
    static serializeJson = (data) => {
        try {
            return JSON.stringify(data);
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    };
    static deserializeJson(data) {
        console.log({ data });
        try {
            return JSON.parse(data);
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    }
}
exports.default = SerializationUtility;
//# sourceMappingURL=serialization_utility.js.map