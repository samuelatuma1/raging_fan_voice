"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const permission_1 = __importDefault(require("../../../../core/auth/domain/entity/permission"));
const tsyringe_1 = require("tsyringe");
const permission_repository_1 = require("../contract/persistence/permission_repository");
const duplicate_exception_1 = __importDefault(require("../../../../core/shared/application/utils/exceptions/duplicate_exception"));
const role_repository_1 = require("../contract/persistence/role_repository");
const role_1 = __importDefault(require("../../../../core/auth/domain/entity/role"));
const auth_request_1 = require("../../domain/dto/request/auth_request");
const user_1 = __importDefault(require("../../../../core/auth/domain/entity/user"));
const create_user_validation_1 = __importDefault(require("./validations/create_user_validation"));
const object_utility_1 = __importDefault(require("../../../../core/shared/application/utils/utilities/object_utility"));
const validation_exception_1 = __importDefault(require("../../../../core/shared/application/utils/exceptions/validation_exception"));
const user_repository_1 = require("../contract/persistence/user_repository");
const file_service_1 = require("../../../../core/shared/application/contract/services/files/file_service");
const mongoose_1 = require("mongoose");
const jwt_service_1 = require("../contract/service/jwt_service");
const event_tracer_1 = require("../../../../core/shared/application/contract/observability/event_tracer");
const cache_service_1 = require("../../../../core/shared/application/contract/data_access/cache/cache_service");
const mail_service_1 = require("../../../../core/chat/application/contract/service/mail_service");
const random_utility_1 = __importDefault(require("../../../../core/shared/application/utils/utilities/random_utility"));
const date_utility_1 = __importDefault(require("../../../../core/shared/application/utils/utilities/date_utility"));
let AuthLogic = class AuthLogic {
    userPermissionRepository;
    userRoleRepository;
    userRepository;
    cacheService;
    fileService;
    jwtService;
    mailService;
    eventTracer;
    UserCachePrefix = "USER_";
    AccessCodeCachePrefix = "ACCESS_CODE_";
    constructor(userPermissionRepository, userRoleRepository, userRepository, cacheService, fileService, jwtService, mailService, eventTracer) {
        this.userPermissionRepository = userPermissionRepository;
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
        this.cacheService = cacheService;
        this.fileService = fileService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.eventTracer = eventTracer;
    }
    createPermission = async (createPermissionRequest) => {
        let permissionExists = await this.userPermissionRepository.firstOrDefaultAsync({ name: createPermissionRequest.name });
        if (permissionExists) {
            throw new duplicate_exception_1.default(`Permission with name already exists: ${createPermissionRequest.name}`);
        }
        let permissionToSave = new permission_1.default({ name: createPermissionRequest.name, desc: createPermissionRequest.desc ?? "" });
        return await this.userPermissionRepository.addAsync(permissionToSave);
    };
    createRole = async (createRoleRequest) => {
        let roleExists = await this.userRoleRepository.firstOrDefaultAsync({ name: createRoleRequest.name });
        if (roleExists) {
            throw new duplicate_exception_1.default(`Role with name already exists: ${createRoleRequest.name}`);
        }
        const rolePermissions = await this.userPermissionRepository.contains({ name: createRoleRequest.permissionNames });
        let permissionsIds = rolePermissions.map(permission => permission._id);
        let roleToSave = new role_1.default({ name: createRoleRequest.name, desc: createRoleRequest.desc ?? "", permissions: permissionsIds });
        return await this.userRoleRepository.addAsync(roleToSave);
    };
    createUser = async (newUser) => {
        const evtTracer = this.eventTracer.instance();
        evtTracer.say("Create user");
        try {
            evtTracer.say("Validating");
            let createUserValidator = new create_user_validation_1.default().validate(newUser);
            if (object_utility_1.default.objectSize(createUserValidator)) {
                throw new validation_exception_1.default(`Validation error occured`, createUserValidator);
            }
            if (newUser.profilePicture) {
                evtTracer.say("Saving profile picture");
                newUser.profilePicture = await this.fileService.uploadFile(newUser.profilePicture);
            }
            evtTracer.say("Getting and adding default roles");
            let userRoles = newUser.roles ?? [];
            userRoles.push("user");
            let rolesIds = [];
            if (userRoles.length) {
                rolesIds = (await this.userRoleRepository.contains({ name: userRoles })).map(role => role._id);
            }
            evtTracer.say("Saving user");
            const savedUser = new user_1.default({ ...newUser, roles: rolesIds });
            const dbSavedUser = await this.userRepository.addAsync(savedUser);
            evtTracer.say("Creating jwt token");
            let jwtPayload = await this.createJwtPayload(dbSavedUser);
            let token = this.jwtService.encode(jwtPayload, 60 * 60 * 24 * 7);
            let signedInUser = dbSavedUser;
            signedInUser.roles = jwtPayload.roles.map(role => role.name);
            signedInUser.token = token;
            evtTracer.isSuccessWithResponseAndMessage(signedInUser);
            return signedInUser;
        }
        catch (ex) {
            evtTracer.isExceptionWithMessage(ex.message);
            throw ex;
        }
    };
    getUser = async (id, options = { useCache: true }) => {
        let user;
        let cacheKey = `${this.UserCachePrefix}${id}`;
        if (options.useCache) {
            user = await this.cacheService.getAsync(cacheKey);
        }
        if (!user) {
            user = await this.userRepository.getByIdAsync(new mongoose_1.Types.ObjectId(id));
            if (user) {
                this.cacheService.addAsync(cacheKey, user, 60 * 30);
            }
        }
        return user;
    };
    createJwtPayload = async (user) => {
        let rolesAndPermissions = await this.userRoleRepository.contains({ _id: user.roles }, { permissions: true });
        let permissions = [];
        for (let role of rolesAndPermissions) {
            permissions = [...permissions, ...(role.permissions.filter(permission => permission !== null)).map(permission => permission)];
        }
        return {
            ...user,
            roles: rolesAndPermissions,
            permissions
        };
    };
    generateCode = async () => {
        // generate 4 digit code
        let generatedNumber = random_utility_1.default.randomNumbersAsString(4);
        // save code in cache
        let durationInSeconds = 60 * 60 * 3;
        const expiresIn = date_utility_1.default.addTimeToCurrentTime(durationInSeconds);
        let validateAccessCodeResponse = new auth_request_1.ValidateAccessCodeResponse({
            codeSentByUser: generatedNumber,
            isValidCode: true,
            expiresIn
        });
        await this.cacheService.addAsync(this.AccessCodeCachePrefix, validateAccessCodeResponse, durationInSeconds);
        // send to admin's mail
        let notificationRecipients = await this.getUsersWithPermission("admin");
        await this.mailService.sendMailToMultipleRecipients(notificationRecipients.map(rec => rec.email), "Raging Fan access Code", `ACCESS CODE: ${generatedNumber} <br/> Expires in ${expiresIn}`);
        // return code
        return validateAccessCodeResponse;
    };
    isValidAccessCode = async (code) => {
        // get access code
        let accessCode = await this.cacheService.getAsync(this.AccessCodeCachePrefix);
        console.log({ accessCode, code });
        if (!accessCode) {
            return false;
        }
        return accessCode.codeSentByUser === code;
        // compare against code set here
        // return code
    };
    validateAccessCode = async (code) => {
        let accessCode = await this.cacheService.getAsync(this.AccessCodeCachePrefix);
        console.log({ accessCode, code });
        let wrongcode = new auth_request_1.ValidateAccessCodeResponse({
            isValidCode: false,
            codeSentByUser: code,
        });
        if (!accessCode) {
            console.log("No access code generated");
            return wrongcode;
        }
        else if (accessCode.codeSentByUser === code) {
            console.log("Wrong access code");
            return accessCode;
        }
        return wrongcode;
    };
    getUsersWithPermission = async (permissionName) => {
        let userPermission = await this.userPermissionRepository.firstOrDefaultAsync({ name: permissionName });
        console.log(userPermission);
        if (!userPermission) {
            return [];
        }
        let rolesWithPermission = await this.userRoleRepository.getAsync({ permissions: [userPermission._id] });
        console.log({ userPermission, rolesWithPermission });
        if (!rolesWithPermission) {
            return [];
        }
        let rolesId = rolesWithPermission.map(role => role._id);
        let users = [];
        for (let roleId of rolesId) {
            let usersWithRoles = await this.userRepository.getAsync({ roles: roleId });
            users = [...users, ...usersWithRoles];
        }
        console.log({ users, rolesId });
        return users;
    };
};
AuthLogic = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(permission_repository_1.IIUserPermissionRepository)),
    __param(1, (0, tsyringe_1.inject)(role_repository_1.IIUserRoleRepository)),
    __param(2, (0, tsyringe_1.inject)(user_repository_1.IIUserRepository)),
    __param(3, (0, tsyringe_1.inject)(cache_service_1.IICacheService)),
    __param(4, (0, tsyringe_1.inject)(file_service_1.IIFileService)),
    __param(5, (0, tsyringe_1.inject)(jwt_service_1.IIJwtService)),
    __param(6, (0, tsyringe_1.inject)(mail_service_1.IIMailService)),
    __param(7, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], AuthLogic);
exports.default = AuthLogic;
//# sourceMappingURL=auth_logic.js.map