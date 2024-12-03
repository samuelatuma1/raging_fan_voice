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
exports.CelebrityResponse = void 0;
var celebrity_1 = require("../../entity/celebrity");
var CelebrityResponse = /** @class */ (function (_super) {
    __extends(CelebrityResponse, _super);
    function CelebrityResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CelebrityResponse;
}(celebrity_1["default"]));
exports.CelebrityResponse = CelebrityResponse;
