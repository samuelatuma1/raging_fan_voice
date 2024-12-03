"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var celebrity_1 = require("../../../../core/raging_fan/domain/entity/celebrity");
var tsyringe_1 = require("tsyringe");
var create_celebrity_validation_1 = require("./validation/create_celebrity_validation");
var object_utility_1 = require("../../../../core/shared/application/utils/utilities/object_utility");
var validation_exception_1 = require("../../../../core/shared/application/utils/exceptions/validation_exception");
var file_service_1 = require("../../../../core/shared/application/contract/services/files/file_service");
var celebrity_repository_1 = require("../contract/persistence/celebrity_repository");
var event_tracer_1 = require("../../../../core/shared/application/contract/observability/event_tracer");
var mongoose_1 = require("mongoose");
var not_found_exception_1 = require("../../../../core/shared/application/utils/exceptions/not_found_exception");
var celebrity_training_repository_1 = require("../contract/persistence/celebrity_training_repository");
var celebrity_training_1 = require("../../../../core/raging_fan/domain/entity/celebrity_training");
var duplicate_exception_1 = require("../../../../core/shared/application/utils/exceptions/duplicate_exception");
var train_celebrity_validation_1 = require("./validation/train_celebrity_validation");
var cache_service_1 = require("../../../../core/shared/application/contract/data_access/cache/cache_service");
var CelebrityLogic = /** @class */ (function () {
    function CelebrityLogic(fileService, celebrityRepository, cacheService, celebrityTrainingRepository, eventTracer) {
        var _this = this;
        this.fileService = fileService;
        this.celebrityRepository = celebrityRepository;
        this.cacheService = cacheService;
        this.celebrityTrainingRepository = celebrityTrainingRepository;
        this.eventTracer = eventTracer;
        this.celebrityCachePrefix = "CELEBRITY_";
        this.convertCreateCelebrityRequestToCelebrity = function (request) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new celebrity_1["default"](__assign({}, request))];
            });
        }); };
        this.convertCreateCelebrityTrainingRequestToCelebrityTraining = function (request) { return __awaiter(_this, void 0, Promise, function () {
            var conversationTemplate;
            return __generator(this, function (_a) {
                conversationTemplate = request.conversationTemplate.map(function (conversationUnit) {
                    var savedConversationUnit = new celebrity_training_1.ConversationTemplate(conversationUnit);
                    return savedConversationUnit;
                });
                return [2 /*return*/, new celebrity_training_1["default"](__assign(__assign({}, request), { celebrityId: new mongoose_1.Types.ObjectId(request.celebrityId), conversationTemplate: conversationTemplate }))];
            });
        }); };
        this.createCelebrity = function (request) { return __awaiter(_this, void 0, Promise, function () {
            var evtTracer, validationErrors, uploadedPicture, icons, avatar, celebrity, response, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evtTracer = this.eventTracer.instance();
                        evtTracer.say("createCelebrity");
                        evtTracer.request = request;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        evtTracer.say("Validating request data");
                        validationErrors = (new create_celebrity_validation_1.CreateCelebrityValidation()).validate(request);
                        if (object_utility_1["default"].objectSize(validationErrors)) {
                            throw new validation_exception_1["default"]("Validation errors", validationErrors);
                        }
                        if (!request.profilePicture) return [3 /*break*/, 3];
                        evtTracer.say("Profile picture found, saving");
                        return [4 /*yield*/, this.fileService.uploadFile(request.profilePicture)];
                    case 2:
                        uploadedPicture = _a.sent();
                        request.profilePicture = uploadedPicture;
                        _a.label = 3;
                    case 3:
                        if (!request.icons) return [3 /*break*/, 5];
                        evtTracer.say("Profile picture found, saving");
                        return [4 /*yield*/, this.fileService.uploadMultipleFiles(request.icons)];
                    case 4:
                        icons = _a.sent();
                        request.icons = icons;
                        _a.label = 5;
                    case 5:
                        if (!request.avatar) return [3 /*break*/, 7];
                        evtTracer.say("Profile picture found, saving");
                        return [4 /*yield*/, this.fileService.uploadFile(request.avatar)];
                    case 6:
                        avatar = _a.sent();
                        request.avatar = avatar;
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.convertCreateCelebrityRequestToCelebrity(request)];
                    case 8:
                        celebrity = _a.sent();
                        evtTracer.say("Saving celebrity");
                        return [4 /*yield*/, this.celebrityRepository.addAsync(celebrity)];
                    case 9:
                        response = _a.sent();
                        evtTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 10:
                        ex_1 = _a.sent();
                        evtTracer.isExceptionWithMessage(ex_1.message);
                        throw ex_1;
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.getCelebrities = function (query) { return __awaiter(_this, void 0, Promise, function () {
            var evtTracer, _query, celebrityResponses, celebrities, celebrityIds, celebrityTrainings, celebrityTrainingDict, response, _i, celebrities_1, celebrity, celebrityId, celebrityResponse, ex_2;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        evtTracer = this.eventTracer.instance();
                        evtTracer.request = query;
                        evtTracer.say("Get Celebrities");
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        _query = {};
                        if (query._id) {
                            _query._id = query._id;
                        }
                        if (query.fullName) {
                            _query.fullName = { $regex: query.fullName, $options: 'i' };
                        }
                        evtTracer.say("Getting celebrities");
                        return [4 /*yield*/, this.celebrityRepository.toPagedAsync(_query, (_a = query.page) !== null && _a !== void 0 ? _a : 0, (_b = query.pageSize) !== null && _b !== void 0 ? _b : 0)];
                    case 2:
                        celebrityResponses = _d.sent();
                        celebrities = celebrityResponses.items;
                        evtTracer.say("Celebrities gotten: " + celebrities.length + ". Getting training data");
                        celebrityIds = celebrities.map(function (celeb) { return celeb._id; });
                        return [4 /*yield*/, this.celebrityTrainingRepository.contains({ celebrityId: celebrityIds })];
                    case 3:
                        celebrityTrainings = _d.sent();
                        celebrityTrainingDict = object_utility_1["default"].toDict(celebrityTrainings, "celebrityId");
                        evtTracer.say("Adding training data to celebrity");
                        response = [];
                        for (_i = 0, celebrities_1 = celebrities; _i < celebrities_1.length; _i++) {
                            celebrity = celebrities_1[_i];
                            celebrityId = celebrity._id.toString();
                            celebrityResponse = celebrity;
                            celebrityResponse.training = (_c = celebrityTrainingDict[celebrityId]) !== null && _c !== void 0 ? _c : null;
                            response.push(celebrityResponse);
                        }
                        celebrityResponses.items = response;
                        evtTracer.isSuccessWithResponseAndMessage(celebrityResponses);
                        return [2 /*return*/, celebrityResponses];
                    case 4:
                        ex_2 = _d.sent();
                        evtTracer.isErrorWithMessage(ex_2.message);
                        throw ex_2;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getCelebrity = function (celebrityId, options) {
            if (options === void 0) { options = { useCache: true }; }
            return __awaiter(_this, void 0, Promise, function () {
                var evtTracer, celebrityResponse, celebrity, celebrityTraining, ex_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            evtTracer = this.eventTracer.instance();
                            evtTracer.request = celebrityId;
                            evtTracer.say("Get Celebrity");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 8]);
                            celebrityResponse = null;
                            if (!options.useCache) return [3 /*break*/, 3];
                            evtTracer.say("Trying to get celebrity response from cache");
                            return [4 /*yield*/, this.cacheService.getAsync("" + this.celebrityCachePrefix + celebrityId)];
                        case 2:
                            celebrityResponse = _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!!celebrityResponse) return [3 /*break*/, 6];
                            evtTracer.say("Getting saved celebrity");
                            return [4 /*yield*/, this.celebrityRepository.getByIdAsync(new mongoose_1.Types.ObjectId(celebrityId))];
                        case 4:
                            celebrity = _a.sent();
                            if (!celebrity) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.celebrityTrainingRepository.firstOrDefaultAsync({ celebrityId: new mongoose_1.Types.ObjectId(celebrityId) })];
                        case 5:
                            celebrityTraining = _a.sent();
                            celebrityResponse = celebrity;
                            celebrityResponse.training = celebrityTraining;
                            this.cacheService.addAsync("" + this.celebrityCachePrefix + celebrityResponse._id, celebrityResponse, 60 * 30); // no need to await this 
                            _a.label = 6;
                        case 6:
                            evtTracer.isSuccessWithResponseAndMessage(celebrityResponse);
                            return [2 /*return*/, celebrityResponse];
                        case 7:
                            ex_3 = _a.sent();
                            evtTracer.isErrorWithMessage(ex_3.message);
                            throw ex_3;
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        this.trainCelebrity = function (createCelebrityTrainingRquest) { return __awaiter(_this, void 0, Promise, function () {
            var evtTracer, validationErrors, celebrityId, celebrity, celebrityTrainingExists, celebrityTraining, savedTraining, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evtTracer = this.eventTracer.instance();
                        evtTracer.say("Train Celebrity");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        validationErrors = (new train_celebrity_validation_1.TrainCelebrityValidator()).validate(createCelebrityTrainingRquest);
                        console.log({ validationErrors: validationErrors });
                        if (object_utility_1["default"].objectSize(validationErrors)) {
                            throw new validation_exception_1["default"]("Validation errors", validationErrors);
                        }
                        // get celebrity by id
                        evtTracer.say("Getting celebrity by id");
                        celebrityId = new mongoose_1.Types.ObjectId(createCelebrityTrainingRquest.celebrityId);
                        return [4 /*yield*/, this.celebrityRepository.getByIdAsync(celebrityId)];
                    case 2:
                        celebrity = _a.sent();
                        if (!celebrity) {
                            throw new not_found_exception_1["default"]("Celebrity with id not found");
                        }
                        return [4 /*yield*/, this.celebrityTrainingRepository.firstOrDefaultAsync({ celebrityId: createCelebrityTrainingRquest.celebrityId })];
                    case 3:
                        celebrityTrainingExists = _a.sent();
                        if (celebrityTrainingExists) {
                            throw new duplicate_exception_1["default"]("Celebrity training already exists for ceebrity");
                        }
                        evtTracer.say("Celebrity found. Saving training data");
                        return [4 /*yield*/, this.convertCreateCelebrityTrainingRequestToCelebrityTraining(createCelebrityTrainingRquest)];
                    case 4:
                        celebrityTraining = _a.sent();
                        return [4 /*yield*/, this.celebrityTrainingRepository.addAsync(celebrityTraining)];
                    case 5:
                        savedTraining = _a.sent();
                        evtTracer.response = savedTraining;
                        evtTracer.isSuccess();
                        return [2 /*return*/, savedTraining];
                    case 6:
                        ex_4 = _a.sent();
                        evtTracer.isErrorWithMessage(ex_4.message);
                        throw ex_4;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    CelebrityLogic = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(file_service_1.IIFileService)),
        __param(1, tsyringe_1.inject(celebrity_repository_1.IICelebrityRepository)),
        __param(2, tsyringe_1.inject(cache_service_1.IICacheService)),
        __param(3, tsyringe_1.inject(celebrity_training_repository_1.IICelebrityTrainingRepository)),
        __param(4, tsyringe_1.inject(event_tracer_1.IIEventTracer))
    ], CelebrityLogic);
    return CelebrityLogic;
}());
exports["default"] = CelebrityLogic;
