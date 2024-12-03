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
exports.ConversationTemplateRequest = exports.QueryCelebrity = exports.CreateCelebrityRequest = void 0;
var base_entity_1 = require("../../../../../core/shared/domain/entity/base_entity");
var CreateCelebrityRequest = /** @class */ (function () {
    function CreateCelebrityRequest() {
        this.dob = new Date();
        this.icons = [];
    }
    return CreateCelebrityRequest;
}());
exports.CreateCelebrityRequest = CreateCelebrityRequest;
var QueryCelebrity = /** @class */ (function () {
    function QueryCelebrity() {
        this.page = 0;
        this.pageSize = 0;
    }
    return QueryCelebrity;
}());
exports.QueryCelebrity = QueryCelebrity;
var ConversationTemplateRequest = /** @class */ (function () {
    function ConversationTemplateRequest() {
    }
    return ConversationTemplateRequest;
}());
exports.ConversationTemplateRequest = ConversationTemplateRequest;
var CreateCelebrityTraining = /** @class */ (function (_super) {
    __extends(CreateCelebrityTraining, _super);
    function CreateCelebrityTraining() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateCelebrityTraining;
}(base_entity_1["default"]));
exports["default"] = CreateCelebrityTraining;
