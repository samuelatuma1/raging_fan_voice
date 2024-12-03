import UploadFile from "../../../../shared/domain/model/upload_file";
export declare class CreatePermissionRequest {
    name: string;
    desc: string;
}
export declare class CreateRoleRequest {
    name: string;
    desc: string;
    permissionNames: string[];
}
export declare class CreateUserRequest {
    name: string;
    profilePicture?: UploadFile;
    email?: string;
    roles?: string[];
}
export declare class ValidateAccessCodeResponse {
    codeSentByUser: number | string;
    isValidCode: boolean;
    expiresIn?: Date;
    /**
     *
     */
    constructor(init: {
        codeSentByUser: number | string;
        isValidCode: boolean;
        expiresIn?: Date;
    });
}
