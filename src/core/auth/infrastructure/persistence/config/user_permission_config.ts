import { model, Model, Schema } from "mongoose";
import UserPermission from "../../../../../core/auth/domain/entity/permission";

export const UserPermissionSchema = new Schema<UserPermission>({
    name: {type: String, required: true},
    desc: {type: String},
})

export const userPermissionModel = model("UserPermission", UserPermissionSchema) 