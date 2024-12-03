"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_auth_middleware_1 = __importDefault(require("../../api/middlewares/jwt_auth_middleware"));
const auth_controller_1 = __importDefault(require("../../api/controllers/auth_controller"));
const program_1 = require("../../api/program");
const express_1 = require("express");
const authController = program_1.iocContainer.resolve(auth_controller_1.default);
let jwtMiddleware = program_1.iocContainer.resolve(jwt_auth_middleware_1.default);
const authRouter = (0, express_1.Router)();
authRouter.post("/create", jwtMiddleware.verifyUserHasAccess, authController.createUser);
authRouter.post("/validate", authController.validateCode);
authRouter.get("/access_code", authController.genererateCode);
exports.default = authRouter;
//# sourceMappingURL=auth_route.js.map