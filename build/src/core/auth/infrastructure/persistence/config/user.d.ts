import User from "../../../../../core/auth/domain/entity/user";
import { Model, Schema } from "mongoose";
export declare const UserSchema: Schema<User, Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>;
export declare const userModel: Model<User, {}, {}, {}, import("mongoose").Document<unknown, {}, User> & User & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, Schema<User, Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>>;
