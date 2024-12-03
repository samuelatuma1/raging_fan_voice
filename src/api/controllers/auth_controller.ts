import { inject, injectable } from "tsyringe";
import BaseController from "./base_controller";
import { NextFunction, Request, Response } from "express";
import { IAuthLogic, IIAuthLogic } from "../../core/auth/application/contract/logic/auth_logic";
import { CreateUserRequest } from "../../core/auth/domain/dto/request/auth_request";
import { access } from "fs";

@injectable()
export default class AuthController extends BaseController {

    public constructor(
        @inject(IIAuthLogic) private readonly authLogic: IAuthLogic
        
    ){
        super();
    }
   
    public createUser = async (req: Request<{}, {}, CreateUserRequest>, res: Response, next: NextFunction) => {
        try{
            console.log("Here")
            let user = await this.authLogic.createUser(req.body)
            res.json(user)
        } catch(ex){
            next(ex)
        }
    }

    public genererateCode = async  (req: Request, res: Response, next: NextFunction) => {

        try{
            let code = await this.authLogic.generateCode();
            res.json(code)
        } catch(ex){
            next(ex)
        }
        
    }

    public validateCode = async (req: Request<{}, {}, {code: string}>, res: Response, next: NextFunction) => {
        try{
            let accessCode = await this.authLogic.validateAccessCode(req.body.code);
            res.json(accessCode)
        } catch(ex){
            next(ex)
        }
    }
}