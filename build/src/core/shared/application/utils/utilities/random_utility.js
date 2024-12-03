"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RandomUtility {
    static newGuid = () => {
        return (0, uuid_1.v4)();
    };
    static randomNumbersAsString = (size) => {
        let response = "";
        for (let i = 0; i < size; i++) {
            response += `${Math.floor(Math.random() * 10)}`;
        }
        return response;
    };
    static randomNumber = (size) => {
        return Math.floor(Math.random() * (10 * size));
    };
}
exports.default = RandomUtility;
//# sourceMappingURL=random_utility.js.map