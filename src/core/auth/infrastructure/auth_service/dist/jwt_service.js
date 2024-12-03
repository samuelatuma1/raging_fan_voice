"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var jsonwebtoken_1 = require("jsonwebtoken");
var JwtService = /** @class */ (function () {
    function JwtService() {
        this.encode = function (payload, expiresInSeconds, secret) {
            if (secret === void 0) { secret = "123456789098765432122344567789098876asasadsaxaafafffddddserfgghuuhhgh"; }
            return jsonwebtoken_1["default"].sign(payload, secret, { expiresIn: expiresInSeconds });
        };
    }
    JwtService.prototype.decode = function (token, secret) {
        if (secret === void 0) { secret = "123456789098765432122344567789098876asasadsaxaafafffddddserfgghuuhhgh"; }
        console.log({ token: token });
        return jsonwebtoken_1["default"].verify(token, secret);
    };
    JwtService = __decorate([
        tsyringe_1.injectable()
    ], JwtService);
    return JwtService;
}());
exports["default"] = JwtService;
