import { BaseRepository } from "../../../../shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
import User from "../../../../../core/auth/domain/entity/user";
import IUserRepository from "../../../../../core/auth/application/contract/persistence/user_repository";
export default class UserRepository extends BaseRepository<User, Types.ObjectId> implements IUserRepository {
    constructor();
}
