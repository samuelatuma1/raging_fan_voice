"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialization_utility_1 = __importDefault(require("./serialization_utility"));
class ObjectUtility {
    static areListsEqual = (list1, list2) => {
        if (list1.length !== list2.length)
            return false;
        for (let idx = 0; idx < list1.length; idx++) {
            const itemAtIdx1 = list1[idx];
            const itemAtIdx2 = list2[idx];
            if (itemAtIdx1 !== itemAtIdx2) {
                return false;
            }
        }
        return true;
    };
    static objectSize = (obj) => {
        return Object.keys(obj).length;
    };
    static removeNullOrUndefinedValuesFromObject(obj) {
        let response = {};
        for (let [key, value] of Object.entries(obj)) {
            if (value === null || value === undefined) {
            }
            else {
                response[key] = value;
            }
        }
        return response;
    }
    static updateAwithB(a, b) {
        let c = serialization_utility_1.default.serializeJson(a);
        let d = serialization_utility_1.default.deserializeJson(c);
        for (let [key, value] of Object.entries(b)) {
            d[key] = value;
        }
        return d;
    }
    static toDict(list, key) {
        let response = {};
        for (let item of list) {
            const itemDict = item;
            const stringKey = (itemDict[key])?.toString();
            if (stringKey) {
                response[stringKey] = item;
            }
        }
        return response;
    }
    static toDictList(list, key) {
        let response = {};
        for (let item of list) {
            const itemDict = item;
            const stringKey = (itemDict[key])?.toString();
            if (stringKey) {
                const idItems = response[stringKey] ?? [];
                idItems.push(item);
                response[stringKey] = idItems;
            }
        }
        return response;
    }
}
exports.default = ObjectUtility;
//# sourceMappingURL=object_utility.js.map