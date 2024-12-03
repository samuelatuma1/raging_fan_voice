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
var fluentvalidation_ts_1 = require("fluentvalidation-ts");
var CreateUserValidation = /** @class */ (function (_super) {
    __extends(CreateUserValidation, _super);
    function CreateUserValidation() {
        var _this = _super.call(this) || this;
        _this.ruleFor("name").notNull().notEmpty();
        return _this;
    }
    return CreateUserValidation;
}(fluentvalidation_ts_1.Validator));
exports["default"] = CreateUserValidation;
