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
    icons: UploadFile[];
    constructor(init: CelebrityInit);
}
