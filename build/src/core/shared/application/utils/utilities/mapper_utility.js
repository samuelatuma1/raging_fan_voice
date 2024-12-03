"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapperUtility {
    static map(source) {
        let result = {};
        var mapping = { ...source };
        for (let key in mapping) {
            result[key] = source[mapping[key]];
        }
        return result;
    }
}
exports.default = MapperUtility;
//# sourceMappingURL=mapper_utility.js.map