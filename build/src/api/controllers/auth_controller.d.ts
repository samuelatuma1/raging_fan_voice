import BaseController from "./base_controller";
import { NextFunction, Request, Response } from "express";
import { IAuthLogic } from "../../core/auth/application/contract/logic/auth_logic";
import { CreateUserRequest } from "../../core/auth/domain/dto/request/auth_request";
export default class AuthController extends BaseController {
    private readonly authLogic;
    constructor(authLogic: IAuthLogic);
    createUser: (req: Request<{}, {}, CreateUserRequest>, res: Response, next: NextFunction) => Promise<void>;
    genererateCode: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    validateCode: (req: Request<{}, {}, {
        code: string;
    }>, res: Response, next: NextFunction) => Promise<void>;
}
