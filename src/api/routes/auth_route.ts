import JwtMiddlewareAuth from "../../api/middlewares/jwt_auth_middleware";
import AuthController from "../../api/controllers/auth_controller";
import { iocContainer } from "../../api/program";
import { Router, Request, Response, NextFunction } from "express";


const authController = iocContainer.resolve(AuthController);

let jwtMiddleware = iocContainer.resolve(JwtMiddlewareAuth);
const authRouter = Router();
authRouter.post("/create", jwtMiddleware.verifyUserHasAccess, authController.createUser)
authRouter.post("/validate", authController.validateCode)
authRouter.get("/access_code",  authController.genererateCode)

export default authRouter;