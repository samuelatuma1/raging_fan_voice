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
var mongoose_1 = require("mongoose");
var base_entity_1 = require("../../../../core/shared/domain/entity/base_entity");
var UserPermission = /** @class */ (function (_super) {
    __extends(UserPermission, _super);
    function UserPermission(init) {
        var _this = _super.call(this, new mongoose_1.Types.ObjectId()) || this;
        _this.name = init.name;
        _this.desc = init.desc;
        return _this;
    }
    return UserPermission;
}(base_entity_1["default"]));
exports["default"] = UserPermission;
