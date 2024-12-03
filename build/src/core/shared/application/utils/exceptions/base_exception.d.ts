export default class BaseException extends Error {
    _errors: {
        [key: string]: any;
    };
    constructor(message: string, errors?: {
        [key: string]: any;
    });
}
