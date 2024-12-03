"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const record_status_1 = require("../enum/record_status");
class BaseEntity {
    _id;
    recordStatus;
    createdAt;
    updatedAt;
    constructor(id, recordStatus = record_status_1.RecordStatus.PENDING, createdAt = new Date(), updatedAt = new Date()) {
        this._id = id;
        this.recordStatus = recordStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.default = BaseEntity;
//# sourceMappingURL=base_entity.js.map