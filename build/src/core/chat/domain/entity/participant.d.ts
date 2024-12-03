import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
import { Types } from "mongoose";
export interface ParticipantInit {
    chatId: Types.ObjectId;
    userId?: Types.ObjectId;
    celebrityId?: Types.ObjectId;
}
export declare class Participant extends BaseEntity<Types.ObjectId> {
    chatId: Types.ObjectId;
    userId?: Types.ObjectId;
    celebrityId?: Types.ObjectId;
    constructor(init: ParticipantInit);
}
