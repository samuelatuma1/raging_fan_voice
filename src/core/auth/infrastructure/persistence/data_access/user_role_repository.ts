import { BaseRepository } from "../../../../shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
import { injectable } from "tsyringe";
import UserRole from "core/auth/domain/entity/role";
import IUserRoleRepository from "../../../application/contract/persistence/role_repository";
import { userRoleModel } from "../config/user_role_config";

@injectable()
export default class UserRoleRepository extends BaseRepository<UserRole, Types.ObjectId>  implements IUserRoleRepository {
    constructor(){
        super(userRoleModel)
    }
}