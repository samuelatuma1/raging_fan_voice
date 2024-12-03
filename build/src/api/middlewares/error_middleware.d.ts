import { NextFunction } from "express";
import { Request, Response } from "express";
import BaseException from "../../core/shared/application/utils/exceptions/base_exception";
export declare const ErrorMiddleware: (ex: BaseException | Error, request: Request, response: Response, next: NextFunction) => void;
