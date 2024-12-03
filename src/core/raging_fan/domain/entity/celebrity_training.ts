import { Types } from "mongoose";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";


export interface ConversationTemplateInit{
    fanMessage: string;
    celebrityReply: string;
}

export class ConversationTemplate {
    public _id: Types.ObjectId = new Types.ObjectId();
    public fanMessage: string;
    public celebrityReply: string;

    public constructor(init: ConversationTemplateInit){
        this._id = new Types.ObjectId();
        this.fanMessage = init.fanMessage;
        this.celebrityReply = init.celebrityReply;
    }
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
    public constructor(init: CelebrityTrainingInit){
        const _id = new Types.ObjectId();
        super(_id);
        
        this.celebrityId = init.celebrityId;
        this.personality = init.personality;
        this.conversationTemplate = init.conversationTemplate;
    }
}