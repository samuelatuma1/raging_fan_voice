import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
import { Types } from "mongoose";

export interface ParticipantInit {
    chatId: Types.ObjectId;
    userId?: Types.ObjectId;
    celebrityId?: Types.ObjectId;
}
export class Participant extends BaseEntity<Types.ObjectId> {
    chatId: Types.ObjectId;
    userId?: Types.ObjectId;
    celebrityId?: Types.ObjectId;

    public constructor(init: ParticipantInit){
        super(new Types.ObjectId());
        this.chatId = init.chatId;
        this.userId = init.userId;
        this.celebrityId = init.celebrityId;
    }
}