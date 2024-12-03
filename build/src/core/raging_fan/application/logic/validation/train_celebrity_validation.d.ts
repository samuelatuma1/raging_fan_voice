import CreateCelebrityTraining from "../../../../../core/raging_fan/domain/dto/requests/celebrity";
import { Validator } from "fluentvalidation-ts";
export declare class TrainCelebrityValidator extends Validator<CreateCelebrityTraining> {
    constructor();
    private haveConversation;
}
