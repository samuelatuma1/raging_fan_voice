import { IAuthLogic } from "../../core/auth/application/contract/logic/auth_logic";
import { Request, NextFunction, Response } from "express";
export default class JwtMiddlewareAuth {
    private readonly authLogic;
    constructor(authLogic: IAuthLogic);
    verifyUserHasAccess: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAccessTokenPayloadFromToken: (req: Request) => null;
}
