import UserRole from "../../../../../core/auth/domain/entity/role";
import { model, Model, Schema } from "mongoose";

export const UserRoleSchema = new Schema<UserRole>({
    name: {type: String, required: true},
    desc: {type: String},
    permissions: {type: [Schema.Types.ObjectId], ref: 'UserPermission' }
})

export const userRoleModel = model("UserRole", UserRoleSchema)