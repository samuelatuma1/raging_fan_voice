import { CreateUserRequest } from "../../../domain/dto/request/auth_request";
import { Validator } from "fluentvalidation-ts";

export default class CreateUserValidation extends Validator<CreateUserRequest> {
    public constructor(){
        super();
        this.ruleFor("name").notNull().notEmpty();
    }
}