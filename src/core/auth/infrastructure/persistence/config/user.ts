import { UploadFileSchema } from "../../../../../core/shared/infrastructure/persistence/data_access/config/upload_file_schema";
import User from "../../../../../core/auth/domain/entity/user";
import { model, Model, Schema } from "mongoose";

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: String,
    profilePicture: UploadFileSchema,
    roles: [Schema.Types.ObjectId]
})

export const userModel = model("User", UserSchema)