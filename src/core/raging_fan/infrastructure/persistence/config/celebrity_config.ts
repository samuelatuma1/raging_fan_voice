import { model, Model, Schema } from "mongoose";
import Celebrity from "../../../../../core/raging_fan/domain/entity/celebrity";
import UploadFile from "core/shared/domain/model/upload_file";
import { UploadFileSchema } from "../../../../../core/shared/infrastructure/persistence/data_access/config/upload_file_schema";

export const CelebritySchema = new Schema<Celebrity>({
    fullName: {type: String, required: true},
    dob: {type: Date, required: false},
    profilePicture: {type: UploadFileSchema},
    avatar: {type: UploadFileSchema},
    icons: {type: [UploadFileSchema]}
})

export const celebrityModel = model("Celebrity", CelebritySchema)