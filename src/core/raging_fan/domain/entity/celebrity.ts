import UploadFile from "../../../../core/shared/domain/model/upload_file";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
import { Types } from "mongoose";


export interface CelebrityInit {
    fullName: string;
    dob: Date;
    profilePicture?: UploadFile;
    avatar?: UploadFile;
    icons: UploadFile[];
}
export default class Celebrity extends BaseEntity<Types.ObjectId> {
    fullName: string;
    dob: Date;
    profilePicture?: UploadFile;
    avatar?: UploadFile;
    icons: UploadFile[] = [];
    public constructor(init: CelebrityInit){
        let _id = new Types.ObjectId();
        super(_id);
        this.fullName = init.fullName;
        this.dob = init.dob;
        this.profilePicture = init.profilePicture ?? null;
        this.avatar = init.avatar ?? null;
        this.icons = init.icons ?? [];
    }
}