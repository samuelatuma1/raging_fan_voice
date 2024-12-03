import Celebrity from "../../../../core/raging_fan/domain/entity/celebrity";
import CreateCelebrityTraining, { CreateCelebrityRequest, QueryCelebrity } from "../../../../core/raging_fan/domain/dto/requests/celebrity";
import { inject, injectable } from "tsyringe";
import { CreateCelebrityValidation } from "./validation/create_celebrity_validation";
import ObjectUtility from "../../../../core/shared/application/utils/utilities/object_utility";
import ValidationException from "../../../../core/shared/application/utils/exceptions/validation_exception";
import IFileService, { IIFileService } from "../../../../core/shared/application/contract/services/files/file_service";
import ICelebrityRepository, { IICelebrityRepository } from "../contract/persistence/celebrity_repository";
import IEventTracer, { IIEventTracer } from "../../../../core/shared/application/contract/observability/event_tracer";
import { ICelebrityLogic } from "../contract/logic/celebrity_logic";
import { Types } from "mongoose";
import NotFoundException from "../../../../core/shared/application/utils/exceptions/not_found_exception";
import ICelebrityTrainingRepository, { IICelebrityTrainingRepository } from "../contract/persistence/celebrity_training_repository";
import CelebrityTraining, { ConversationTemplate } from "../../../../core/raging_fan/domain/entity/celebrity_training";
import DuplicateException from "../../../../core/shared/application/utils/exceptions/duplicate_exception";
import { TrainCelebrityValidator } from "./validation/train_celebrity_validation";
import { CelebrityResponse } from "../../../../core/raging_fan/domain/dto/responses/celebrity";
import { PaginationResponse } from "../../../../core/shared/domain/model/pagination";
import ICacheService, { IICacheService } from "../../../../core/shared/application/contract/data_access/cache/cache_service";


@injectable()
export default class CelebrityLogic implements ICelebrityLogic {
    private readonly celebrityCachePrefix = "CELEBRITY_"
    public constructor(
        @inject(IIFileService) private readonly fileService: IFileService,
        @inject(IICelebrityRepository) private readonly celebrityRepository: ICelebrityRepository,
        @inject(IICacheService) private readonly cacheService: ICacheService,
        @inject(IICelebrityTrainingRepository) private readonly celebrityTrainingRepository: ICelebrityTrainingRepository,
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer
    ){

    }

    private convertCreateCelebrityRequestToCelebrity = async (request: CreateCelebrityRequest): Promise<Celebrity> => {
        return new Celebrity({...request})
    }
    private convertCreateCelebrityTrainingRequestToCelebrityTraining = async (request: CreateCelebrityTraining): Promise<CelebrityTraining> => {
        const conversationTemplate = request.conversationTemplate.map(conversationUnit => {
            const savedConversationUnit = new ConversationTemplate(conversationUnit)
            return savedConversationUnit;
        });


        return new CelebrityTraining({...request, celebrityId: new Types.ObjectId(request.celebrityId), conversationTemplate})
    }
    public createCelebrity = async (request: CreateCelebrityRequest): Promise<Celebrity> => {
        let evtTracer = this.eventTracer.instance();
        evtTracer.say("createCelebrity");
        evtTracer.request = request;
        try{
            evtTracer.say("Validating request data");
            const validationErrors = (new CreateCelebrityValidation()).validate(request);
            if(ObjectUtility.objectSize(validationErrors)){
                throw new ValidationException("Validation errors", validationErrors);
            }
            if(request.profilePicture){
                evtTracer.say("Profile picture found, saving")
                const uploadedPicture = await this.fileService.uploadFile(request.profilePicture);
                request.profilePicture = uploadedPicture;
            }
            if(request.icons){
                evtTracer.say("Profile picture found, saving")
                const icons = await this.fileService.uploadMultipleFiles(request.icons);
                request.icons = icons;
            }
            if(request.avatar){
                evtTracer.say("Profile picture found, saving")
                const avatar = await this.fileService.uploadFile(request.avatar);
                request.avatar = avatar;
            }
            const celebrity = await this.convertCreateCelebrityRequestToCelebrity(request);
            
            evtTracer.say("Saving celebrity")

            const response = await this.celebrityRepository.addAsync(celebrity);

            evtTracer.isSuccessWithResponseAndMessage(response);
            return response;
        } catch(ex){
            evtTracer.isExceptionWithMessage(ex.message);
            throw ex;
        }
    }

    public getCelebrities = async (query: QueryCelebrity) : Promise<PaginationResponse<CelebrityResponse>> => {
        let evtTracer = this.eventTracer.instance();
        evtTracer.request = query;
        evtTracer.say("Get Celebrities");
        try{
            let _query: {[key: string]: any} = {}
            if(query._id){
                _query._id = query._id;
            }
            if(query.fullName){
                _query.fullName = { $regex: query.fullName, $options: 'i' }
            }
            evtTracer.say("Getting celebrities");
            const celebrityResponses = await this.celebrityRepository.toPagedAsync(_query, query.page ?? 0, query.pageSize ?? 0)
            const celebrities = celebrityResponses.items;

            evtTracer.say(`Celebrities gotten: ${celebrities.length}. Getting training data`);
            const celebrityIds = celebrities.map(celeb => celeb._id);
            const celebrityTrainings = await this.celebrityTrainingRepository.contains({celebrityId: celebrityIds})

            const celebrityTrainingDict = ObjectUtility.toDict<CelebrityTraining>(celebrityTrainings, "celebrityId");
            evtTracer.say(`Adding training data to celebrity`)
            let response: CelebrityResponse[] = []; 
            for(let celebrity of celebrities){
                const celebrityId = celebrity._id.toString();
                const celebrityResponse = celebrity as CelebrityResponse;
                celebrityResponse.training = celebrityTrainingDict[celebrityId] ?? null;
                response.push(celebrityResponse);
            }
            celebrityResponses.items = response;

            evtTracer.isSuccessWithResponseAndMessage(celebrityResponses)
            return celebrityResponses as PaginationResponse<CelebrityResponse>;
        } catch(ex){
            evtTracer.isErrorWithMessage(ex.message);
            throw ex;
        }

    }

    public getCelebrity = async (celebrityId: Types.ObjectId, options: {useCache?: boolean} = {useCache: true}) : Promise<CelebrityResponse | null> => {
        let evtTracer = this.eventTracer.instance();
        evtTracer.request = celebrityId;
        evtTracer.say("Get Celebrity");
        try{
            let celebrityResponse: CelebrityResponse | null = null;
            if(options.useCache){
                evtTracer.say(`Trying to get celebrity response from cache`)
                celebrityResponse = await this.cacheService.getAsync<CelebrityResponse>(`${this.celebrityCachePrefix}${celebrityId}`)
            }
            if(!celebrityResponse){
                evtTracer.say(`Getting saved celebrity`)
                let celebrity = await this.celebrityRepository.getByIdAsync(new Types.ObjectId(celebrityId));
                if(celebrity){
                    const celebrityTraining = await this.celebrityTrainingRepository.firstOrDefaultAsync({celebrityId: new Types.ObjectId(celebrityId)})
                    celebrityResponse = celebrity as CelebrityResponse
                    celebrityResponse.training = celebrityTraining;
                    
                    this.cacheService.addAsync(`${this.celebrityCachePrefix}${celebrityResponse._id}`, celebrityResponse, 60 * 30) // no need to await this 
                }

            }

            evtTracer.isSuccessWithResponseAndMessage(celebrityResponse);
            return celebrityResponse;
        } catch(ex){
            evtTracer.isErrorWithMessage(ex.message);
            throw ex;
        }

    }

    public trainCelebrity = async (createCelebrityTrainingRquest: CreateCelebrityTraining) : Promise<CelebrityTraining> => {
        let evtTracer = this.eventTracer.instance();
        evtTracer.say("Train Celebrity");
        try{
            const validationErrors = (new TrainCelebrityValidator()).validate(createCelebrityTrainingRquest);
            console.log({validationErrors})
            if(ObjectUtility.objectSize(validationErrors)) {
                throw new ValidationException("Validation errors", validationErrors);
            }

            // get celebrity by id
            evtTracer.say("Getting celebrity by id");
            const celebrityId = new Types.ObjectId(createCelebrityTrainingRquest.celebrityId);
            const celebrity = await this.celebrityRepository.getByIdAsync(celebrityId);
            
            if(!celebrity){
                throw new NotFoundException(`Celebrity with id not found`);
            }

            // check if there is an existing training for celebrity
            const celebrityTrainingExists = await this.celebrityTrainingRepository.firstOrDefaultAsync({celebrityId: createCelebrityTrainingRquest.celebrityId})
            if(celebrityTrainingExists){
                throw new DuplicateException("Celebrity training already exists for ceebrity");
            }
            evtTracer.say("Celebrity found. Saving training data");

            // save
            const celebrityTraining = await this.convertCreateCelebrityTrainingRequestToCelebrityTraining(createCelebrityTrainingRquest);
            const savedTraining = await this.celebrityTrainingRepository.addAsync(celebrityTraining);

            evtTracer.response = savedTraining;
            evtTracer.isSuccess();
            
            return savedTraining;
        } catch(ex){
            evtTracer.isErrorWithMessage(ex.message);
            throw ex;
        }

    }


}