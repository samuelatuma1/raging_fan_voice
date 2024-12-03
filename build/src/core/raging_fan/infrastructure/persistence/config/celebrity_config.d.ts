import { Model, Schema } from "mongoose";
import Celebrity from "../../../../../core/raging_fan/domain/entity/celebrity";
export declare const CelebritySchema: Schema<Celebrity, Model<Celebrity, any, any, any, import("mongoose").Document<unknown, any, Celebrity> & Celebrity & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Celebrity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Celebrity>> & import("mongoose").FlatRecord<Celebrity> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>;
export declare const celebrityModel: Model<Celebrity, {}, {}, {}, import("mongoose").Document<unknown, {}, Celebrity> & Celebrity & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, Schema<Celebrity, Model<Celebrity, any, any, any, import("mongoose").Document<unknown, any, Celebrity> & Celebrity & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Celebrity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Celebrity>> & import("mongoose").FlatRecord<Celebrity> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>>;
