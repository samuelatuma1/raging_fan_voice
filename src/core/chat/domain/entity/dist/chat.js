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
exports.Chat = void 0;
var base_entity_1 = require("../../../../core/shared/domain/entity/base_entity");
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Chat;
}(base_entity_1["default"]));
exports.Chat = Chat;
