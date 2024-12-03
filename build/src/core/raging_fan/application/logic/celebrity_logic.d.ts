import Celebrity from "../../../../core/raging_fan/domain/entity/celebrity";
import CreateCelebrityTraining, { CreateCelebrityRequest, QueryCelebrity } from "../../../../core/raging_fan/domain/dto/requests/celebrity";
import IFileService from "../../../../core/shared/application/contract/services/files/file_service";
import ICelebrityRepository from "../contract/persistence/celebrity_repository";
import IEventTracer from "../../../../core/shared/application/contract/observability/event_tracer";
import { ICelebrityLogic } from "../contract/logic/celebrity_logic";
import { Types } from "mongoose";
import ICelebrityTrainingRepository from "../contract/persistence/celebrity_training_repository";
import CelebrityTraining from "../../../../core/raging_fan/domain/entity/celebrity_training";
import { CelebrityResponse } from "../../../../core/raging_fan/domain/dto/responses/celebrity";
import { PaginationResponse } from "../../../../core/shared/domain/model/pagination";
import ICacheService from "../../../../core/shared/application/contract/data_access/cache/cache_service";
export default class CelebrityLogic implements ICelebrityLogic {
    private readonly fileService;
    private readonly celebrityRepository;
    private readonly cacheService;
    private readonly celebrityTrainingRepository;
    private readonly eventTracer;
    private readonly celebrityCachePrefix;
    constructor(fileService: IFileService, celebrityRepository: ICelebrityRepository, cacheService: ICacheService, celebrityTrainingRepository: ICelebrityTrainingRepository, eventTracer: IEventTracer);
    private convertCreateCelebrityRequestToCelebrity;
    private convertCreateCelebrityTrainingRequestToCelebrityTraining;
    createCelebrity: (request: CreateCelebrityRequest) => Promise<Celebrity>;
    getCelebrities: (query: QueryCelebrity) => Promise<PaginationResponse<CelebrityResponse>>;
    getCelebrity: (celebrityId: Types.ObjectId, options?: {
        useCache?: boolean;
    }) => Promise<CelebrityResponse | null>;
    trainCelebrity: (createCelebrityTrainingRquest: CreateCelebrityTraining) => Promise<CelebrityTraining>;
}
