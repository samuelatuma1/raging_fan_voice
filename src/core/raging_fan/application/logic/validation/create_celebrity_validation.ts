import { CreateCelebrityRequest } from "core/raging_fan/domain/dto/requests/celebrity";
import { Validator } from "fluentvalidation-ts";

export class CreateCelebrityValidation extends Validator<CreateCelebrityRequest>{
    public constructor(){
        super();
        this.ruleFor("fullName").notNull().notEmpty();
    }
}