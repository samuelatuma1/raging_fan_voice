import UserRole from "../../../../../core/auth/domain/entity/role";
import { Model, Schema } from "mongoose";
export declare const UserRoleSchema: Schema<UserRole, Model<UserRole, any, any, any, import("mongoose").Document<unknown, any, UserRole> & UserRole & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserRole, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserRole>> & import("mongoose").FlatRecord<UserRole> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>;
export declare const userRoleModel: Model<UserRole, {}, {}, {}, import("mongoose").Document<unknown, {}, UserRole> & UserRole & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, Schema<UserRole, Model<UserRole, any, any, any, import("mongoose").Document<unknown, any, UserRole> & UserRole & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserRole, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserRole>> & import("mongoose").FlatRecord<UserRole> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>>;
