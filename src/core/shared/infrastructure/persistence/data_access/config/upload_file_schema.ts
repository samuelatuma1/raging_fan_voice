import UploadFile from "../../../../../../core/shared/domain/model/upload_file";
import { Schema } from "mongoose";

export const  UploadFileSchema = new Schema<UploadFile>({
    resource_type: String,
    secure_url: String,
    public_id: String,
    folder: String,
    name: String
});