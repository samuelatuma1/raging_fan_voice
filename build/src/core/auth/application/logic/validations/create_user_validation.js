"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fluentvalidation_ts_1 = require("fluentvalidation-ts");
class CreateUserValidation extends fluentvalidation_ts_1.Validator {
    constructor() {
        super();
        this.ruleFor("name").notNull().notEmpty();
    }
}
exports.default = CreateUserValidation;
//# sourceMappingURL=create_user_validation.js.map