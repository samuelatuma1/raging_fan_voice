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
exports.Participant = void 0;
var base_entity_1 = require("../../../../core/shared/domain/entity/base_entity");
var mongoose_1 = require("mongoose");
var Participant = /** @class */ (function (_super) {
    __extends(Participant, _super);
    function Participant(init) {
        var _this = _super.call(this, new mongoose_1.Types.ObjectId()) || this;
        _this.chatId = init.chatId;
        _this.userId = init.userId;
        _this.celebrityId = init.celebrityId;
        return _this;
    }
    return Participant;
}(base_entity_1["default"]));
exports.Participant = Participant;
