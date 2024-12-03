
import { IAuthLogic, IIAuthLogic } from "../../core/auth/application/contract/logic/auth_logic";
import {    Request,  NextFunction, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export default class JwtMiddlewareAuth {
    public constructor(
        @inject(IIAuthLogic) private readonly authLogic: IAuthLogic
    ){
        
    }

    public verifyUserHasAccess = async (req: Request, res: Response, next: NextFunction) => {
        // get access token from 
        console.log("HERE")
        console.log({headers: req.headers})
        let accessCode = req.headers.access_code as string ?? "";
        console.log(accessCode);
        let isValidAccessCode = await this.authLogic.isValidAccessCode(accessCode)
       
        if(isValidAccessCode){
            next();
        }else{
            res.status(401).json('Permission denied')
        }
    }

    public getAccessTokenPayloadFromToken = (req: Request) => {
        let token = req.headers.authorization ?? '';
        console.log(token)
        token = token.split(" ")[1] ?? token
        let decodedToken:   null = null
        return decodedToken
    }
}

