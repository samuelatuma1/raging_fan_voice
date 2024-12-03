import { AIMessageUnitRole } from "../enum/ai_message_enum";

export class AIMessageUnit {
    public role: AIMessageUnitRole = AIMessageUnitRole.user;
    public content: string;
    public constructor(init : {role?: AIMessageUnitRole, content: string}){
        this.role = init.role ?? AIMessageUnitRole.user;
        this.content = init.content ?? init.content;
    }
}

export class AIMessageResponseUnit {
    finish_reason: string;
    message: AIMessageUnit
}
export class AIMessageResponse {
    choices: AIMessageResponseUnit[];
    model: string;
}