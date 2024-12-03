import { BaseRepository } from "../../../../shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
import UserPermission from "../../../domain/entity/permission";
import IUserPermissionRepository from "../../../application/contract/persistence/permission_repository";
export default class UserPermissionRepository extends BaseRepository<UserPermission, Types.ObjectId> implements IUserPermissionRepository {
    constructor();
}
