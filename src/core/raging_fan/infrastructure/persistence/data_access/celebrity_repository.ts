import ICelebrityRepository from "../../../../../core/raging_fan/application/contract/persistence/celebrity_repository";
import Celebrity from "../../../../../core/raging_fan/domain/entity/celebrity";
import { BaseRepository } from "../../../../../core/shared/infrastructure/persistence/data_access/base_repository";
import { Types } from "mongoose";
import { injectable } from "tsyringe";
import { celebrityModel } from "../config/celebrity_config";

@injectable()
export default class CelebrityRepository extends BaseRepository<Celebrity, Types.ObjectId>  implements ICelebrityRepository {
    constructor(){
        
        super(celebrityModel)
    }
}