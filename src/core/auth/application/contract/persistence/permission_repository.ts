import UserPermission from "../../../../../core/auth/domain/entity/permission";
import IBaseRepository from "../../../../../core/shared/application/contract/data_access/base_repository";
import { Types } from "mongoose";

export default interface IUserPermissionRepository extends IBaseRepository<UserPermission, Types.ObjectId> {

}

export const IIUserPermissionRepository = "IUserPermissionRepository";