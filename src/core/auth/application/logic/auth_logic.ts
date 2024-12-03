import UserPermission from "../../../../core/auth/domain/entity/permission";
import { inject, injectable } from "tsyringe";
import IUserPermissionRepository, { IIUserPermissionRepository } from "../contract/persistence/permission_repository";
import DuplicateException from "../../../../core/shared/application/utils/exceptions/duplicate_exception";
import IUserRoleRepository, { IIUserRoleRepository } from "../contract/persistence/role_repository";
import UserRole from "../../../../core/auth/domain/entity/role";
import { CreatePermissionRequest, CreateRoleRequest, CreateUserRequest, ValidateAccessCodeResponse } from "../../domain/dto/request/auth_request";
import { IAuthLogic } from "../contract/logic/auth_logic";
import User from "../../../../core/auth/domain/entity/user";
import CreateUserValidation from "./validations/create_user_validation";
import ObjectUtility from "../../../../core/shared/application/utils/utilities/object_utility";
import ValidationException from "../../../../core/shared/application/utils/exceptions/validation_exception";
import IUserRepository, { IIUserRepository } from "../contract/persistence/user_repository";
import IFileService, { IIFileService } from "../../../../core/shared/application/contract/services/files/file_service";
import { Types } from "mongoose";
import { IIJwtService, IJwtService } from "../contract/service/jwt_service";
import { JwtTokenPayload } from "../../../../core/auth/domain/model/jwt_token_payload";
import { SignedInUser } from "../../../../core/auth/domain/dto/response/auth_response";
import IEventTracer, { IIEventTracer } from "../../../../core/shared/application/contract/observability/event_tracer";
import ICacheService, { IICacheService } from "../../../../core/shared/application/contract/data_access/cache/cache_service";
import { IIMailService, IMailService } from "../../../../core/chat/application/contract/service/mail_service";
import RandomUtility from "../../../../core/shared/application/utils/utilities/random_utility";
import DateUtility from "../../../../core/shared/application/utils/utilities/date_utility";
import { access } from "fs";

@injectable()
export default class AuthLogic implements IAuthLogic{
    private readonly UserCachePrefix = "USER_"
    private readonly AccessCodeCachePrefix = "ACCESS_CODE_"
    public constructor(
        @inject(IIUserPermissionRepository) private readonly userPermissionRepository: IUserPermissionRepository,
        @inject(IIUserRoleRepository) private readonly userRoleRepository: IUserRoleRepository,
        @inject(IIUserRepository) private readonly userRepository: IUserRepository,
        @inject(IICacheService) private readonly cacheService: ICacheService,
        @inject(IIFileService) private readonly fileService: IFileService,
        @inject(IIJwtService) private readonly jwtService: IJwtService,
        @inject(IIMailService) private readonly mailService: IMailService,
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer
    ){

    }

    public createPermission = async (createPermissionRequest: CreatePermissionRequest): Promise<UserPermission> => {
        let permissionExists = await this.userPermissionRepository.firstOrDefaultAsync({name: createPermissionRequest.name});
        if(permissionExists){
            throw new DuplicateException(`Permission with name already exists: ${createPermissionRequest.name}`);
        }

        let permissionToSave = new UserPermission({name: createPermissionRequest.name, desc: createPermissionRequest.desc ?? ""})
        return await this.userPermissionRepository.addAsync(permissionToSave);
    }

    public createRole = async (createRoleRequest: CreateRoleRequest): Promise<UserRole> => {
        let roleExists = await this.userRoleRepository.firstOrDefaultAsync({name: createRoleRequest.name});
        if(roleExists){
            throw new DuplicateException(`Role with name already exists: ${createRoleRequest.name}`);
        }

        const rolePermissions = await this.userPermissionRepository.contains({name: createRoleRequest.permissionNames})
        let permissionsIds = rolePermissions.map(permission => permission._id)
        let roleToSave = new UserRole({name: createRoleRequest.name, desc: createRoleRequest.desc ?? "", permissions: permissionsIds})
        return await this.userRoleRepository.addAsync(roleToSave);
    }

    public createUser = async (newUser: CreateUserRequest): Promise<SignedInUser>=> {
        const evtTracer = this.eventTracer.instance();
        evtTracer.say("Create user")
        try{
            evtTracer.say("Validating")
            let createUserValidator = new CreateUserValidation().validate(newUser);

            if(ObjectUtility.objectSize(createUserValidator)){
                throw new ValidationException(`Validation error occured`, createUserValidator);
            }

            if(newUser.profilePicture){
                evtTracer.say("Saving profile picture")
                newUser.profilePicture = await this.fileService.uploadFile(newUser.profilePicture)
            }

            evtTracer.say("Getting and adding default roles")
            let userRoles = newUser.roles ?? [];
            userRoles.push("user")
            let rolesIds: Types.ObjectId[] = []
            if(userRoles.length){
                rolesIds = (await this.userRoleRepository.contains({name: userRoles})).map(role => role._id);
            }

            evtTracer.say("Saving user");
            const savedUser = new User({...newUser, roles: rolesIds})
            const dbSavedUser = await this.userRepository.addAsync(savedUser);

            evtTracer.say("Creating jwt token")
            let jwtPayload: JwtTokenPayload = await this.createJwtPayload(dbSavedUser)
            let token = this.jwtService.encode(jwtPayload, 60 * 60 * 24 * 7)

            let signedInUser = dbSavedUser as unknown as SignedInUser
            signedInUser.roles = jwtPayload.roles.map(role => role.name);
            signedInUser.token = token
            
            evtTracer.isSuccessWithResponseAndMessage(signedInUser);
            return signedInUser;
        } catch(ex){
            evtTracer.isExceptionWithMessage(ex.message)
            throw ex;
        }
    }

    public getUser = async (id: Types.ObjectId, options: {useCache: boolean} = {useCache: true}): Promise<User> => {
        let user: User;
        let cacheKey = `${this.UserCachePrefix}${id}`
        if(options.useCache){
            user = await this.cacheService.getAsync<User>(cacheKey)
        } if(!user){

            user = await this.userRepository.getByIdAsync(new Types.ObjectId(id));
            if(user){
                this.cacheService.addAsync(cacheKey, user, 60 * 30)
            }
        }

        return user;
    }

    public createJwtPayload = async  (user: User): Promise<JwtTokenPayload> => {
        let rolesAndPermissions: UserRole[] = await this.userRoleRepository.contains({_id: user.roles}, {permissions: true})
        let permissions: UserPermission[] = [];
        
        for(let role of rolesAndPermissions){
            permissions = [...permissions, ...(role.permissions.filter(permission => permission !== null)).map(permission => permission as UserPermission)]
        } 

        return {
            ...user,
            roles: rolesAndPermissions,
            permissions
        }
    }

    public generateCode = async (): Promise<ValidateAccessCodeResponse> => {
        // generate 4 digit code
        let generatedNumber = RandomUtility.randomNumbersAsString(4)
        // save code in cache
        let durationInSeconds = 60 * 60 * 3;
        const expiresIn = DateUtility.addTimeToCurrentTime(durationInSeconds);
        let validateAccessCodeResponse = new ValidateAccessCodeResponse({
            codeSentByUser: generatedNumber,
            isValidCode: true,
            expiresIn
        })
        await this.cacheService.addAsync(this.AccessCodeCachePrefix, validateAccessCodeResponse , durationInSeconds)
        // send to admin's mail
        let notificationRecipients = await this.getUsersWithPermission("admin");
        await this.mailService.sendMailToMultipleRecipients(notificationRecipients.map(rec => rec.email), 
        "Raging Fan access Code", `ACCESS CODE: ${generatedNumber} <br/> Expires in ${expiresIn}`)
        // return code
        return validateAccessCodeResponse;
    }

    public isValidAccessCode = async (code: string): Promise<boolean> => {
       // get access code
       let accessCode = await this.cacheService.getAsync<ValidateAccessCodeResponse>(this.AccessCodeCachePrefix);
       console.log({accessCode, code})
       if(!accessCode){
        return false;
       }
       return accessCode.codeSentByUser === code;
       // compare against code set here
        // return code
    }

    public validateAccessCode = async (code: string): Promise<ValidateAccessCodeResponse> => {
        let accessCode = await this.cacheService.getAsync<ValidateAccessCodeResponse>(this.AccessCodeCachePrefix);
        console.log({accessCode, code})
        let wrongcode = new ValidateAccessCodeResponse({
            isValidCode: false,
            codeSentByUser: code,
         })
        if(!accessCode){
            console.log("No access code generated")
         return wrongcode;
        }
        else if(accessCode.codeSentByUser === code){
            console.log("Wrong access code")

            return accessCode
        }
        return wrongcode;
    }

    getUsersWithPermission = async (permissionName: string): Promise<User[]> => {
        let userPermission = await this.userPermissionRepository.firstOrDefaultAsync({name: permissionName})
        console.log(userPermission)
        if(!userPermission){
            return []
        }
        let rolesWithPermission  = await this.userRoleRepository.getAsync({permissions: [userPermission._id]})
        console.log({userPermission, rolesWithPermission})

        if(!rolesWithPermission){
            return []
        }

        let rolesId = rolesWithPermission.map(role => role._id);
        let users: User[] = []
        for(let roleId of rolesId){
            let usersWithRoles = await this.userRepository.getAsync({roles: roleId})
            users = [...users, ...usersWithRoles]

        }
        console.log({users, rolesId})
        return users;
    }
}
