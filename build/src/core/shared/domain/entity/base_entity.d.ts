import { RecordStatus } from "../enum/record_status";
export default class BaseEntity<TId> {
    _id: TId;
    recordStatus: RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    constructor(id: TId, recordStatus?: RecordStatus, createdAt?: Date, updatedAt?: Date);
}
