import UploadFile from "../../../../../core/shared/domain/model/upload_file";
import UserPermission from "../../entity/permission";
import UserRole from "../../entity/role";
import { Types } from "mongoose";

export class SignedInUser {
    roles: UserRole[] | string[];
    permissions: UserPermission[];
    name: string;
    email: string;
    profilePicture?: UploadFile;
    _id: Types.ObjectId;
    token: string
}