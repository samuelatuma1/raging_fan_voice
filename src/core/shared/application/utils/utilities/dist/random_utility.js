"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var RandomUtility = /** @class */ (function () {
    function RandomUtility() {
    }
    RandomUtility.newGuid = function () {
        return uuid_1.v4();
    };
    RandomUtility.randomNumbersAsString = function (size) {
        var response = "";
        for (var i = 0; i < size; i++) {
            response += "" + Math.floor(Math.random() * 10);
        }
        return response;
    };
    RandomUtility.randomNumber = function (size) {
        return Math.floor(Math.random() * (10 * size));
    };
    return RandomUtility;
}());
exports["default"] = RandomUtility;
