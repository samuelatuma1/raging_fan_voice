import { injectable } from "tsyringe";
import { IMessageRepository } from "../../../../../core/chat/application/contract/data_access/message_repository";
import { Message } from "../../../../../core/chat/domain/entity/message";
import { BaseRepository } from "../../../../../core/shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
import { messageModel } from "../config/message_config";

@injectable()
export default class MessageRepository extends BaseRepository<Message, Types.ObjectId> implements IMessageRepository{
   public constructor(){
    super(messageModel)
   }
}