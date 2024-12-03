import User from "../../../../../core/auth/domain/entity/user";
import IBaseRepository from "../../../../../core/shared/application/contract/data_access/base_repository";
import { Types } from "mongoose";
export default interface IUserRepository extends IBaseRepository<User, Types.ObjectId> {
}
export declare const IIUserRepository = "IUserRepository";
