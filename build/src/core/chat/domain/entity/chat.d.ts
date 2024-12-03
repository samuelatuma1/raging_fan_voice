import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
import { Types } from "mongoose";
import { ChatType } from "../enum/chat_type";
import { Participant } from "./participant";
export declare class Chat extends BaseEntity<Types.ObjectId> {
    chatType: ChatType | string;
    participants: Participant[];
}
