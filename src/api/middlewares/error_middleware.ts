import { NextFunction } from "express";
import {Request, Response} from "express";
import BaseException from "../../core/shared/application/utils/exceptions/base_exception";

class ErrorModel extends BaseException{
  public constructor(){
    super("")
  }
   message: string
   errors: any
}
export const ErrorMiddleware = (
    ex: BaseException | Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const errorModel = new ErrorModel();
        let errorStatusCode = 400;
        switch(ex.name){
            
            default:
                errorModel.message = ex.message;
                errorModel.errors = {}
        }

        if(ex instanceof BaseException){
          errorModel.errors = ex._errors;
        }
        response.status(errorStatusCode).json(errorModel);
  };