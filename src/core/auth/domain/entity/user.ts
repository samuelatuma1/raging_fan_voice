import UploadFile from "../../../shared/domain/model/upload_file";
import BaseEntity from "../../../shared/domain/entity/base_entity";
import { Types } from "mongoose";


export interface UserInit {
    name: string;
    profilePicture?: UploadFile;
    email?: string;
    roles?: Types.ObjectId[]
}
export default class User extends BaseEntity<Types.ObjectId> {
    name: string;
    email: string;
    profilePicture?: UploadFile;
    roles: Types.ObjectId[]
    public constructor(init: UserInit){
        let _id = new Types.ObjectId();
        super(_id);
        this.name = init.name;
        this.email = init.email ?? "";
        this.profilePicture = init.profilePicture ?? null;
        this.roles = init.roles ?? []
    }
}