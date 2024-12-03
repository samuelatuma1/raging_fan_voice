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
exports.ConversationTemplate = void 0;
var mongoose_1 = require("mongoose");
var base_entity_1 = require("../../../../core/shared/domain/entity/base_entity");
var ConversationTemplate = /** @class */ (function () {
    function ConversationTemplate(init) {
        this._id = new mongoose_1.Types.ObjectId();
        this._id = new mongoose_1.Types.ObjectId();
        this.fanMessage = init.fanMessage;
        this.celebrityReply = init.celebrityReply;
    }
    return ConversationTemplate;
}());
exports.ConversationTemplate = ConversationTemplate;
var CelebrityTraining = /** @class */ (function (_super) {
    __extends(CelebrityTraining, _super);
    function CelebrityTraining(init) {
        var _this = this;
        var _id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, _id) || this;
        _this.celebrityId = init.celebrityId;
        _this.personality = init.personality;
        _this.conversationTemplate = init.conversationTemplate;
        return _this;
    }
    return CelebrityTraining;
}(base_entity_1["default"]));
exports["default"] = CelebrityTraining;
