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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const base_controller_1 = __importDefault(require("./base_controller"));
const auth_logic_1 = require("../../core/auth/application/contract/logic/auth_logic");
let AuthController = class AuthController extends base_controller_1.default {
    authLogic;
    constructor(authLogic) {
        super();
        this.authLogic = authLogic;
    }
    createUser = async (req, res, next) => {
        try {
            console.log("Here");
            let user = await this.authLogic.createUser(req.body);
            res.json(user);
        }
        catch (ex) {
            next(ex);
        }
    };
    genererateCode = async (req, res, next) => {
        try {
            let code = await this.authLogic.generateCode();
            res.json(code);
        }
        catch (ex) {
            next(ex);
        }
    };
    validateCode = async (req, res, next) => {
        try {
            let accessCode = await this.authLogic.validateAccessCode(req.body.code);
            res.json(accessCode);
        }
        catch (ex) {
            next(ex);
        }
    };
};
AuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(auth_logic_1.IIAuthLogic)),
    __metadata("design:paramtypes", [Object])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth_controller.js.map