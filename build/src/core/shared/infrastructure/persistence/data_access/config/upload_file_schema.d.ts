import UploadFile from "../../../../../../core/shared/domain/model/upload_file";
import { Schema } from "mongoose";
export declare const UploadFileSchema: Schema<UploadFile, import("mongoose").Model<UploadFile, any, any, any, import("mongoose").Document<unknown, any, UploadFile> & UploadFile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UploadFile, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UploadFile>> & import("mongoose").FlatRecord<UploadFile> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
