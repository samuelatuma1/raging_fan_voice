export default class BaseException extends Error{
    public _errors: {[key: string]: any}
    public constructor(message: string, errors: {[key: string]: any } = {}){
        super(message)
        this._errors = errors;
    }
    
}