"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseException extends Error {
    _errors;
    constructor(message, errors = {}) {
        super(message);
        this._errors = errors;
    }
}
exports.default = BaseException;
//# sourceMappingURL=base_exception.js.map