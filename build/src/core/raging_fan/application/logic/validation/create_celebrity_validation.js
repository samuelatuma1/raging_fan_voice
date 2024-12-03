"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCelebrityValidation = void 0;
const fluentvalidation_ts_1 = require("fluentvalidation-ts");
class CreateCelebrityValidation extends fluentvalidation_ts_1.Validator {
    constructor() {
        super();
        this.ruleFor("fullName").notNull().notEmpty();
    }
}
exports.CreateCelebrityValidation = CreateCelebrityValidation;
//# sourceMappingURL=create_celebrity_validation.js.map