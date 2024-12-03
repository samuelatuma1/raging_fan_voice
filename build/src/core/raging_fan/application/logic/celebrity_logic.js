"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrity_1 = __importDefault(require("../../../../core/raging_fan/domain/entity/celebrity"));
const tsyringe_1 = require("tsyringe");
const create_celebrity_validation_1 = require("./validation/create_celebrity_validation");
const object_utility_1 = __importDefault(require("../../../../core/shared/application/utils/utilities/object_utility"));
const validation_exception_1 = __importDefault(require("../../../../core/shared/application/utils/exceptions/validation_exception"));
const file_service_1 = require("../../../../core/shared/application/contract/services/files/file_service");
const celebrity_repository_1 = require("../contract/persistence/celebrity_repository");
const event_tracer_1 = require("../../../../core/shared/application/contract/observability/event_tracer");
const mongoose_1 = require("mongoose");
const not_found_exception_1 = __importDefault(require("../../../../core/shared/application/utils/exceptions/not_found_exception"));
const celebrity_training_repository_1 = require("../contract/persistence/celebrity_training_repository");
const celebrity_training_1 = __importStar(require("../../../../core/raging_fan/domain/entity/celebrity_training"));
const duplicate_exception_1 = __importDefault(require("../../../../core/shared/application/utils/exceptions/duplicate_exception"));
const train_celebrity_validation_1 = require("./validation/train_celebrity_validation");
const cache_service_1 = require("../../../../core/shared/application/contract/data_access/cache/cache_service");
let CelebrityLogic = class CelebrityLogic {
    fileService;
    celebrityRepository;
    cacheService;
    celebrityTrainingRepository;
    eventTracer;
    celebrityCachePrefix = "CELEBRITY_";
    constructor(fileService, celebrityRepository, cacheService, celebrityTrainingRepository, eventTracer) {
        this.fileService = fileService;
        this.celebrityRepository = celebrityRepository;
        this.cacheService = cacheService;
        this.celebrityTrainingRepository = celebrityTrainingRepository;
        this.eventTracer = eventTracer;
    }
    convertCreateCelebrityRequestToCelebrity = async (request) => {
        return new celebrity_1.default({ ...request });
    };
    convertCreateCelebrityTrainingRequestToCelebrityTraining = async (request) => {
        const conversationTemplate = request.conversationTemplate.map(conversationUnit => {
            const savedConversationUnit = new celebrity_training_1.ConversationTemplate(conversationUnit);
            return savedConversationUnit;
        });
        return new celebrity_training_1.default({ ...request, celebrityId: new mongoose_1.Types.ObjectId(request.celebrityId), conversationTemplate });
    };
    createCelebrity = async (request) => {
        let evtTracer = this.eventTracer.instance();
        evtTracer.say("createCelebrity");
        evtTracer.request = request;
        try {
            evtTracer.say("Validating request data");
            const validationErrors = (new create_celebrity_validation_1.CreateCelebrityValidation()).validate(request);
            if (object_utility_1.default.objectSize(validationErrors)) {
                throw new validation_exception_1.default("Validation errors", validationErrors);
            }
            if (request.profilePicture) {
                evtTracer.say("Profile picture found, saving");
                const uploadedPicture = await this.fileService.uploadFile(request.profilePicture);
                request.profilePicture = uploadedPicture;
            }
            if (request.icons) {
                evtTracer.say("Profile picture found, saving");
                const icons = await this.fileService.uploadMultipleFiles(request.icons);
                request.icons = icons;
            }
            if (request.avatar) {
                evtTracer.say("Profile picture found, saving");
                const avatar = await this.fileService.uploadFile(request.avatar);
                request.avatar = avatar;
            }
            const celebrity = await this.convertCreateCelebrityRequestToCelebrity(request);
            evtTracer.say("Saving celebrity");
            const response = await this.celebrityRepository.addAsync(celebrity);
            evtTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch (ex) {
            evtTracer.isExceptionWithMessage(ex.message);
            throw ex;
        }
    };
    getCelebrities = async (query) => {
        let evtTracer = this.eventTracer.instance();
        evtTracer.request = query;
        evtTracer.say("Get Celebrities");
        try {
            let _query = {};
            if (query._id) {
                _query._id = query._id;
            }
            if (query.fullName) {
                _query.fullName = { $regex: query.fullName, $options: 'i' };
            }
            evtTracer.say("Getting celebrities");
            const celebrityResponses = await this.celebrityRepository.toPagedAsync(_query, query.page ?? 0, query.pageSize ?? 0);
            const celebrities = celebrityResponses.items;
            evtTracer.say(`Celebrities gotten: ${celebrities.length}. Getting training data`);
            const celebrityIds = celebrities.map(celeb => celeb._id);
            const celebrityTrainings = await this.celebrityTrainingRepository.contains({ celebrityId: celebrityIds });
            const celebrityTrainingDict = object_utility_1.default.toDict(celebrityTrainings, "celebrityId");
            evtTracer.say(`Adding training data to celebrity`);
            let response = [];
            for (let celebrity of celebrities) {
                const celebrityId = celebrity._id.toString();
                const celebrityResponse = celebrity;
                celebrityResponse.training = celebrityTrainingDict[celebrityId] ?? null;
                response.push(celebrityResponse);
            }
            celebrityResponses.items = response;
            evtTracer.isSuccessWithResponseAndMessage(celebrityResponses);
            return celebrityResponses;
        }
        catch (ex) {
            evtTracer.isErrorWithMessage(ex.message);
            throw ex;
        }
    };
    getCelebrity = async (celebrityId, options = { useCache: true }) => {
        let evtTracer = this.eventTracer.instance();
        evtTracer.request = celebrityId;
        evtTracer.say("Get Celebrity");
        try {
            let celebrityResponse = null;
            if (options.useCache) {
                evtTracer.say(`Trying to get celebrity response from cache`);
                celebrityResponse = await this.cacheService.getAsync(`${this.celebrityCachePrefix}${celebrityId}`);
            }
            if (!celebrityResponse) {
                evtTracer.say(`Getting saved celebrity`);
                let celebrity = await this.celebrityRepository.getByIdAsync(new mongoose_1.Types.ObjectId(celebrityId));
                if (celebrity) {
                    const celebrityTraining = await this.celebrityTrainingRepository.firstOrDefaultAsync({ celebrityId: new mongoose_1.Types.ObjectId(celebrityId) });
                    celebrityResponse = celebrity;
                    celebrityResponse.training = celebrityTraining;
                    this.cacheService.addAsync(`${this.celebrityCachePrefix}${celebrityResponse._id}`, celebrityResponse, 60 * 30); // no need to await this 
                }
            }
            evtTracer.isSuccessWithResponseAndMessage(celebrityResponse);
            return celebrityResponse;
        }
        catch (ex) {
            evtTracer.isErrorWithMessage(ex.message);
            throw ex;
        }
    };
    trainCelebrity = async (createCelebrityTrainingRquest) => {
        let evtTracer = this.eventTracer.instance();
        evtTracer.say("Train Celebrity");
        try {
            const validationErrors = (new train_celebrity_validation_1.TrainCelebrityValidator()).validate(createCelebrityTrainingRquest);
            console.log({ validationErrors });
            if (object_utility_1.default.objectSize(validationErrors)) {
                throw new validation_exception_1.default("Validation errors", validationErrors);
            }
            // get celebrity by id
            evtTracer.say("Getting celebrity by id");
            const celebrityId = new mongoose_1.Types.ObjectId(createCelebrityTrainingRquest.celebrityId);
            const celebrity = await this.celebrityRepository.getByIdAsync(celebrityId);
            if (!celebrity) {
                throw new not_found_exception_1.default(`Celebrity with id not found`);
            }
            // check if there is an existing training for celebrity
            const celebrityTrainingExists = await this.celebrityTrainingRepository.firstOrDefaultAsync({ celebrityId: createCelebrityTrainingRquest.celebrityId });
            if (celebrityTrainingExists) {
                throw new duplicate_exception_1.default("Celebrity training already exists for ceebrity");
            }
            evtTracer.say("Celebrity found. Saving training data");
            // save
            const celebrityTraining = await this.convertCreateCelebrityTrainingRequestToCelebrityTraining(createCelebrityTrainingRquest);
            const savedTraining = await this.celebrityTrainingRepository.addAsync(celebrityTraining);
            evtTracer.response = savedTraining;
            evtTracer.isSuccess();
            return savedTraining;
        }
        catch (ex) {
            evtTracer.isErrorWithMessage(ex.message);
            throw ex;
        }
    };
};
CelebrityLogic = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(file_service_1.IIFileService)),
    __param(1, (0, tsyringe_1.inject)(celebrity_repository_1.IICelebrityRepository)),
    __param(2, (0, tsyringe_1.inject)(cache_service_1.IICacheService)),
    __param(3, (0, tsyringe_1.inject)(celebrity_training_repository_1.IICelebrityTrainingRepository)),
    __param(4, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], CelebrityLogic);
exports.default = CelebrityLogic;
//# sourceMappingURL=celebrity_logic.js.map