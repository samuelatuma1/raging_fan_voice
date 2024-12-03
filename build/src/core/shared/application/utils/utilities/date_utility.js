"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("timers/promises");
class DateUtility {
    static getUTCNow = () => {
        return new Date(new Date().toISOString());
    };
    static getUnixTimeInMilliseconds = () => {
        let date = new Date();
        return date.getTime();
    };
    static delay = async (seconds) => {
        await (0, promises_1.setTimeout)(seconds * 1000);
    };
    static addTimeToCurrentTime = (seconds) => {
        return new Date(DateUtility.getUTCNow().getTime() + seconds * 1000);
    };
}
exports.default = DateUtility;
//# sourceMappingURL=date_utility.js.map