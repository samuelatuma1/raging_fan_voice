import IBaseRepository from "../../../../../core/shared/application/contract/data_access/base_repository";
import { Types } from "mongoose";
import { Message } from "../../../../../core/chat/domain/entity/message";
export interface IMessageRepository extends IBaseRepository<Message, Types.ObjectId> {
}
export declare const IIMessageRepository = "IMessageRepository";
