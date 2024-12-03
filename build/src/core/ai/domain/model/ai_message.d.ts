import { AIMessageUnitRole } from "../enum/ai_message_enum";
export declare class AIMessageUnit {
    role: AIMessageUnitRole;
    content: string;
    constructor(init: {
        role?: AIMessageUnitRole;
        content: string;
    });
}
export declare class AIMessageResponseUnit {
    finish_reason: string;
    message: AIMessageUnit;
}
export declare class AIMessageResponse {
    choices: AIMessageResponseUnit[];
    model: string;
}
