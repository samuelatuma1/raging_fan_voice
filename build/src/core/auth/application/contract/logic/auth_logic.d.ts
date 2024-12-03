import { CreatePermissionRequest, CreateRoleRequest, CreateUserRequest, ValidateAccessCodeResponse } from "../../../domain/dto/request/auth_request";
import UserPermission from "../../../../../core/auth/domain/entity/permission";
import UserRole from "../../../../../core/auth/domain/entity/role";
import { SignedInUser } from "../../../../../core/auth/domain/dto/response/auth_response";
import { Types } from "mongoose";
import User from "../../../../../core/auth/domain/entity/user";
export interface IAuthLogic {
    createPermission(createPermissionRequest: CreatePermissionRequest): Promise<UserPermission>;
    createRole(createRoleRequest: CreateRoleRequest): Promise<UserRole>;
    createUser(newUser: CreateUserRequest): Promise<SignedInUser>;
    getUser(id: Types.ObjectId, options?: {
        useCache: boolean;
    }): Promise<User>;
    generateCode(): Promise<ValidateAccessCodeResponse>;
    isValidAccessCode(code: string): Promise<boolean>;
    validateAccessCode(code: string): Promise<ValidateAccessCodeResponse>;
}
export declare const IIAuthLogic = "IAuthLogic";
