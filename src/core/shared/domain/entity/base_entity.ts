import { RecordStatus } from "../enum/record_status";

export default class BaseEntity<TId>{
    public _id!: TId;
    public recordStatus!: RecordStatus;
    public createdAt!: Date
    public updatedAt!: Date
    
    public constructor(id: TId, recordStatus: RecordStatus = RecordStatus.PENDING, createdAt: Date = new Date(), updatedAt: Date = new Date()){
        this._id = id;
        this.recordStatus = recordStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}