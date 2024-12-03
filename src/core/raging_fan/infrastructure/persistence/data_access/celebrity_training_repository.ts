import ICelebrityTrainingRepository from "../../../../../core/raging_fan/application/contract/persistence/celebrity_training_repository";
import CelebrityTraining from "../../../../../core/raging_fan/domain/entity/celebrity_training";
import { BaseRepository } from "../../../../../core/shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
import { injectable } from "tsyringe";
import { celebrityTrainingModel } from "../config/celebrity_training_config";



@injectable()
export default class CelebrityTrainingRepository extends BaseRepository<CelebrityTraining, Types.ObjectId>  implements ICelebrityTrainingRepository {
    constructor(){
        super(celebrityTrainingModel)
    }
}