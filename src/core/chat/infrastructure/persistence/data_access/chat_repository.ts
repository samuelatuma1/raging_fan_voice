import { IChatRepository } from "../../../../../core/chat/application/contract/data_access/chat_repository";
import { Chat } from "../../../../../core/chat/domain/entity/chat";
import { BaseRepository } from "../../../../../core/shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
import { injectable } from "tsyringe";
import { chatModel } from "../config/chat_config";


@injectable()
export default class ChatRepository extends BaseRepository<Chat, Types.ObjectId> implements IChatRepository{
    public constructor(){
        super(chatModel);
    }
    getChat = async (query: {userId: Types.ObjectId, celebrityId: Types.ObjectId}) : Promise<Chat[]> => {
        let response = await this._model.find({ $and: [{'participants.celebrityId': query.celebrityId, 'participants.userId': query.userId}]})
        return response.map(res => res.toObject())
    }
}