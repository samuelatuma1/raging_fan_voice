import { Types } from "mongoose";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
export interface ConversationTemplateInit {
    fanMessage: string;
    celebrityReply: string;
}
export declare class ConversationTemplate {
    _id: Types.ObjectId;
    fanMessage: string;
    celebrityReply: string;
    constructor(init: ConversationTemplateInit);
}
export interface CelebrityTrainingInit {
    celebrityId: Types.ObjectId;
    personality: string;
    conversationTemplate: ConversationTemplate[];
}
export default class CelebrityTraining extends BaseEntity<Types.ObjectId> {
    celebrityId: Types.ObjectId;
    personality: string;
    conversationTemplate: ConversationTemplate[];
    constructor(init: CelebrityTrainingInit);
}
