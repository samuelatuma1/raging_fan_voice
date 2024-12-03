import UploadFile from "../../../../core/shared/domain/model/upload_file";
import UserPermission from "../entity/permission";
import UserRole from "../entity/role";
import { Types } from "mongoose";
import { RecordStatus } from "../../../../core/shared/domain/enum/record_status";
export interface JwtTokenPayload {
    roles: UserRole[];
    permissions: UserPermission[];
    name: string;
    email: string;
    profilePicture?: UploadFile;
    _id: Types.ObjectId;
    recordStatus: RecordStatus;
    createdAt: Date;
    updatedAt: Date;
}
