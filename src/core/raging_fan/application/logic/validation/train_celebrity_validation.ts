import CreateCelebrityTraining, { ConversationTemplateRequest } from "../../../../../core/raging_fan/domain/dto/requests/celebrity";
import { Validator } from "fluentvalidation-ts";

export class TrainCelebrityValidator extends Validator<CreateCelebrityTraining>{
    public constructor(){
        super();
        this.ruleFor("personality").notNull().notEmpty();
        this.ruleFor("conversationTemplate").must(this.haveConversation).withMessage("Please add conversation")
    }

    private haveConversation = (templateMessages: ConversationTemplateRequest[]) => {
        return (templateMessages?.length ?? 0) > 0
    }
}