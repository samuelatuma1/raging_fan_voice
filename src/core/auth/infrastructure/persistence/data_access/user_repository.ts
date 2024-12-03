import { BaseRepository } from "../../../../shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
import { injectable } from "tsyringe";
import User from "../../../../../core/auth/domain/entity/user";
import { userModel } from "../config/user";
import IUserRepository from "../../../../../core/auth/application/contract/persistence/user_repository";

@injectable()
export default class UserRepository extends BaseRepository<User, Types.ObjectId>  implements IUserRepository {
    constructor(){
        super(userModel)
    }
}