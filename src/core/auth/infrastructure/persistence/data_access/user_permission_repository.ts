import { BaseRepository } from "../../../../shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
import { injectable } from "tsyringe";
import UserPermission from "../../../domain/entity/permission";
import IUserPermissionRepository from "../../../application/contract/persistence/permission_repository";
import { userPermissionModel } from "../config/user_permission_config";

@injectable()
export default class UserPermissionRepository extends BaseRepository<UserPermission, Types.ObjectId>  implements IUserPermissionRepository {
    constructor(){
        super(userPermissionModel)
    }
}