import { IChatRepository } from "../../../../../core/chat/application/contract/data_access/chat_repository";
import { Chat } from "../../../../../core/chat/domain/entity/chat";
import { BaseRepository } from "../../../../../core/shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
export default class ChatRepository extends BaseRepository<Chat, Types.ObjectId> implements IChatRepository {
    constructor();
    getChat: (query: {
        userId: Types.ObjectId;
        celebrityId: Types.ObjectId;
    }) => Promise<Chat[]>;
}
