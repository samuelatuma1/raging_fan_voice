import CelebrityTraining from "../../../../../core/raging_fan/domain/entity/celebrity_training";
import IBaseRepository from "../../../../../core/shared/application/contract/data_access/base_repository";
import { Types } from "mongoose";

export default interface ICelebrityTrainingRepository extends IBaseRepository<CelebrityTraining, Types.ObjectId> {
}

export const IICelebrityTrainingRepository = "ICelebrityTrainingRepository"