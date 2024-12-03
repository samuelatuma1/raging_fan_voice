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
var base_entity_1 = require("../../../../core/shared/domain/entity/base_entity");
var mongoose_1 = require("mongoose");
var Celebrity = /** @class */ (function (_super) {
    __extends(Celebrity, _super);
    function Celebrity(init) {
        var _a, _b, _c;
        var _this = this;
        var _id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, _id) || this;
        _this.icons = [];
        _this.fullName = init.fullName;
        _this.dob = init.dob;
        _this.profilePicture = (_a = init.profilePicture) !== null && _a !== void 0 ? _a : null;
        _this.avatar = (_b = init.avatar) !== null && _b !== void 0 ? _b : null;
        _this.icons = (_c = init.icons) !== null && _c !== void 0 ? _c : [];
        return _this;
    }
    return Celebrity;
}(base_entity_1["default"]));
exports["default"] = Celebrity;
