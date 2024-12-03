import UploadFile from "../../../../shared/domain/model/upload_file";

export class CreatePermissionRequest {
    public name: string;
    public desc: string = "";
}

export class CreateRoleRequest {
    public name: string;
    public desc: string = "";
    permissionNames: string[];
} 

export class CreateUserRequest{
    name: string;
    profilePicture?: UploadFile;
    email?: string;
    roles?:string[] = []
}

export class ValidateAccessCodeResponse {
    codeSentByUser: number | string
    isValidCode: boolean;
    expiresIn?: Date;
    /**
     *
     */
    constructor(init: {codeSentByUser: number | string
        isValidCode: boolean,
        expiresIn?: Date}){
        this.codeSentByUser = init.codeSentByUser;
        this.isValidCode = init.isValidCode;
        this.expiresIn = init.expiresIn ?? null
    }
}