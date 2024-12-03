import { AIMessageUnit } from "../../model/ai_message";
export interface PerplexityApiRequestBody {
    model: string;
    messages: AIMessageUnit[];
    return_images: boolean;
}
export interface ChatGPTApiRequestBody {
    model: string;
    messages: AIMessageUnit[];
}
