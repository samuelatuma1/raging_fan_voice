import CelebrityTraining from "../../../../../core/raging_fan/domain/entity/celebrity_training";
import CreateCelebrityTraining, { CreateCelebrityRequest, QueryCelebrity } from "../../../../../core/raging_fan/domain/dto/requests/celebrity";
import Celebrity from "../../../../../core/raging_fan/domain/entity/celebrity";
import { CelebrityResponse } from "../../../../../core/raging_fan/domain/dto/responses/celebrity";
import { PaginationResponse } from "../../../../../core/shared/domain/model/pagination";
import { Types } from "mongoose";
export interface ICelebrityLogic {
    createCelebrity(request: CreateCelebrityRequest): Promise<Celebrity>;
    trainCelebrity(createCelebrityTrainingRquest: CreateCelebrityTraining): Promise<CelebrityTraining>;
    getCelebrities(query: QueryCelebrity): Promise<PaginationResponse<CelebrityResponse>>;
    getCelebrity(celebrityId: Types.ObjectId, options?: {
        useCache?: boolean;
    }): Promise<CelebrityResponse | null>;
}
export declare const IICelebrityLogic = "ICelebrityLogic";
