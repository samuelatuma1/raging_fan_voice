import { Model, Schema } from "mongoose";
import { Message } from "core/chat/domain/entity/message";
export declare const MessageSchema: Schema<Message, Model<Message, any, any, any, import("mongoose").Document<unknown, any, Message> & Message & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Message>> & import("mongoose").FlatRecord<Message> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>;
export declare const messageModel: Model<Message, {}, {}, {}, import("mongoose").Document<unknown, {}, Message> & Message & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, Schema<Message, Model<Message, any, any, any, import("mongoose").Document<unknown, any, Message> & Message & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Message>> & import("mongoose").FlatRecord<Message> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>>;
