import { Model, Schema } from "mongoose";
import UserPermission from "../../../../../core/auth/domain/entity/permission";
export declare const UserPermissionSchema: Schema<UserPermission, Model<UserPermission, any, any, any, import("mongoose").Document<unknown, any, UserPermission> & UserPermission & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserPermission, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserPermission>> & import("mongoose").FlatRecord<UserPermission> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>;
export declare const userPermissionModel: Model<UserPermission, {}, {}, {}, import("mongoose").Document<unknown, {}, UserPermission> & UserPermission & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, Schema<UserPermission, Model<UserPermission, any, any, any, import("mongoose").Document<unknown, any, UserPermission> & UserPermission & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserPermission, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserPermission>> & import("mongoose").FlatRecord<UserPermission> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>>;
