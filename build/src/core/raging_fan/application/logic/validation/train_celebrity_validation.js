"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainCelebrityValidator = void 0;
const fluentvalidation_ts_1 = require("fluentvalidation-ts");
class TrainCelebrityValidator extends fluentvalidation_ts_1.Validator {
    constructor() {
        super();
        this.ruleFor("personality").notNull().notEmpty();
        this.ruleFor("conversationTemplate").must(this.haveConversation).withMessage("Please add conversation");
    }
    haveConversation = (templateMessages) => {
        return (templateMessages?.length ?? 0) > 0;
    };
}
exports.TrainCelebrityValidator = TrainCelebrityValidator;
//# sourceMappingURL=train_celebrity_validation.js.map