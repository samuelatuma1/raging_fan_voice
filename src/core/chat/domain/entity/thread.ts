import { Types } from "mongoose";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";

export class Thread extends BaseEntity<Types.ObjectId>{
    chatId: Types.ObjectId
}