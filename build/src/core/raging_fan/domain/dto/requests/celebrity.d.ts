import { Types } from "mongoose";
import UploadFile from "../../../../../core/shared/domain/model/upload_file";
import BaseEntity from "../../../../../core/shared/domain/entity/base_entity";
export declare class CreateCelebrityRequest {
    fullName: string;
    dob: Date;
    profilePicture?: UploadFile;
    avatar?: UploadFile;
    icons: UploadFile[];
}
export declare class QueryCelebrity {
    fullName: string;
    _id: Types.ObjectId;
    page: number;
    pageSize: number;
}
export declare class ConversationTemplateRequest {
    fanMessage: string;
    celebrityReply: string;
}
export default class CreateCelebrityTraining extends BaseEntity<Types.ObjectId> {
    celebrityId: Types.ObjectId;
    personality: string;
    conversationTemplate: ConversationTemplateRequest[];
}
