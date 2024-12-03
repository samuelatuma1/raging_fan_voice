import UserRole from "../../../../../core/auth/domain/entity/role";
import IBaseRepository from "../../../../../core/shared/application/contract/data_access/base_repository";
import { Types } from "mongoose";
export default interface IUserRoleRepository extends IBaseRepository<UserRole, Types.ObjectId> {
}
export declare const IIUserRoleRepository = "IUserRoleRepository";
