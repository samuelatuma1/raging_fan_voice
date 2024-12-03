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
exports.Message = void 0;
var mongoose_1 = require("mongoose");
var base_entity_1 = require("../../../../core/shared/domain/entity/base_entity");
var date_utility_1 = require("../../../../core/shared/application/utils/utilities/date_utility");
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(init) {
        var _a, _b;
        var _this = _super.call(this, new mongoose_1.Types.ObjectId()) || this;
        _this.chatId = init.chatId;
        _this.status = init.status;
        _this.senderId = init.senderId;
        _this.messageText = init.messageText;
        _this.messageType = init.messageType;
        _this.isAIGenerated = (_a = init.isAIGenerated) !== null && _a !== void 0 ? _a : false;
        _this.sentAt = (_b = init.sentAt) !== null && _b !== void 0 ? _b : date_utility_1["default"].getUTCNow();
        return _this;
    }
    return Message;
}(base_entity_1["default"]));
exports.Message = Message;
