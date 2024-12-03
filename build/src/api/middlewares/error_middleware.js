"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const base_exception_1 = __importDefault(require("../../core/shared/application/utils/exceptions/base_exception"));
class ErrorModel extends base_exception_1.default {
    constructor() {
        super("");
    }
    message;
    errors;
}
const ErrorMiddleware = (ex, request, response, next) => {
    const errorModel = new ErrorModel();
    let errorStatusCode = 400;
    switch (ex.name) {
        default:
            errorModel.message = ex.message;
            errorModel.errors = {};
    }
    if (ex instanceof base_exception_1.default) {
        errorModel.errors = ex._errors;
    }
    response.status(errorStatusCode).json(errorModel);
};
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=error_middleware.js.map