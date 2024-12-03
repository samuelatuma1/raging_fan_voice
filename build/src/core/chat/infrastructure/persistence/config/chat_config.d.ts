import { Model, Schema } from "mongoose";
import { Chat } from "../../../../../core/chat/domain/entity/chat";
import { Participant } from "core/chat/domain/entity/participant";
export declare const ParticipantSchema: Schema<Participant, Model<Participant, any, any, any, import("mongoose").Document<unknown, any, Participant> & Participant & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Participant, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Participant>> & import("mongoose").FlatRecord<Participant> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>;
export declare const ChatSchema: Schema<Chat, Model<Chat, any, any, any, import("mongoose").Document<unknown, any, Chat> & Chat & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Chat, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Chat>> & import("mongoose").FlatRecord<Chat> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>;
export declare const chatModel: Model<Chat, {}, {}, {}, import("mongoose").Document<unknown, {}, Chat> & Chat & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, Schema<Chat, Model<Chat, any, any, any, import("mongoose").Document<unknown, any, Chat> & Chat & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Chat, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Chat>> & import("mongoose").FlatRecord<Chat> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v?: number;
}>>;
