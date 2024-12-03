"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_logic_1 = require("../../core/auth/application/contract/logic/auth_logic");
const tsyringe_1 = require("tsyringe");
let JwtMiddlewareAuth = class JwtMiddlewareAuth {
    authLogic;
    constructor(authLogic) {
        this.authLogic = authLogic;
    }
    verifyUserHasAccess = async (req, res, next) => {
        // get access token from 
        console.log("HERE");
        console.log({ headers: req.headers });
        let accessCode = req.headers.access_code ?? "";
        console.log(accessCode);
        let isValidAccessCode = await this.authLogic.isValidAccessCode(accessCode);
        if (isValidAccessCode) {
            next();
        }
        else {
            res.status(401).json('Permission denied');
        }
    };
    getAccessTokenPayloadFromToken = (req) => {
        let token = req.headers.authorization ?? '';
        console.log(token);
        token = token.split(" ")[1] ?? token;
        let decodedToken = null;
        return decodedToken;
    };
};
JwtMiddlewareAuth = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(auth_logic_1.IIAuthLogic)),
    __metadata("design:paramtypes", [Object])
], JwtMiddlewareAuth);
exports.default = JwtMiddlewareAuth;
//# sourceMappingURL=jwt_auth_middleware.js.map