import IBaseRepository from "../../../../../core/shared/application/contract/data_access/base_repository";
import { Chat } from "../../../../../core/chat/domain/entity/chat";
import { Types } from "mongoose";
export interface IChatRepository extends IBaseRepository<Chat, Types.ObjectId> {
    getChat(query: {
        userId: Types.ObjectId;
        celebrityId: Types.ObjectId;
    }): Promise<Chat[]>;
}
export declare const IIChatRepository = "IChatRepository";
