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
var chat_1 = require("../../entity/chat");
var ChatResponse = /** @class */ (function (_super) {
    __extends(ChatResponse, _super);
    function ChatResponse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userName = "";
        return _this;
    }
    return ChatResponse;
}(chat_1.Chat));
exports["default"] = ChatResponse;
