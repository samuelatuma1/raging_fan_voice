import Celebrity from "../../../../../core/raging_fan/domain/entity/celebrity";
import IBaseRepository from "../../../../../core/shared/application/contract/data_access/base_repository";
import { Types } from "mongoose";

export default interface ICelebrityRepository extends IBaseRepository<Celebrity, Types.ObjectId> {
}

export const IICelebrityRepository = "ICelebrityRepository"