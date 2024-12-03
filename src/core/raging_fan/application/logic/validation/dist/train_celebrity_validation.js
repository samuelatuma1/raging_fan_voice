"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TrainCelebrityValidator = void 0;
var fluentvalidation_ts_1 = require("fluentvalidation-ts");
var TrainCelebrityValidator = /** @class */ (function (_super) {
    __extends(TrainCelebrityValidator, _super);
    function TrainCelebrityValidator() {
        var _this = _super.call(this) || this;
        _this.haveConversation = function (templateMessages) {
            var _a;
            return ((_a = templateMessages === null || templateMessages === void 0 ? void 0 : templateMessages.length) !== null && _a !== void 0 ? _a : 0) > 0;
        };
        _this.ruleFor("personality").notNull().notEmpty();
        _this.ruleFor("conversationTemplate").must(_this.haveConversation).withMessage("Please add conversation");
        return _this;
    }
    return TrainCelebrityValidator;
}(fluentvalidation_ts_1.Validator));
exports.TrainCelebrityValidator = TrainCelebrityValidator;
