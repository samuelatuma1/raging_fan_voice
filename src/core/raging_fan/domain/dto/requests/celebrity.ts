import { Types } from "mongoose";
import UploadFile from "../../../../../core/shared/domain/model/upload_file";
import BaseEntity from "../../../../../core/shared/domain/entity/base_entity";

export class CreateCelebrityRequest {
    fullName : string;
    dob: Date = new Date();
    profilePicture?: UploadFile;
    avatar?: UploadFile;
    icons: UploadFile[] = [];
}

export class QueryCelebrity {
    fullName: string;
    _id: Types.ObjectId;
    page: number = 0;
    pageSize: number = 0;
}

export class ConversationTemplateRequest {
    public fanMessage: string;
    public celebrityReply: string;
}

export default class CreateCelebrityTraining extends BaseEntity<Types.ObjectId> {
    celebrityId: Types.ObjectId;
    personality: string;
    conversationTemplate: ConversationTemplateRequest[];
}