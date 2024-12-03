"use strict";
exports.__esModule = true;
var record_status_1 = require("../enum/record_status");
var BaseEntity = /** @class */ (function () {
    function BaseEntity(id, recordStatus, createdAt, updatedAt) {
        if (recordStatus === void 0) { recordStatus = record_status_1.RecordStatus.PENDING; }
        if (createdAt === void 0) { createdAt = new Date(); }
        if (updatedAt === void 0) { updatedAt = new Date(); }
        this._id = id;
        this.recordStatus = recordStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    return BaseEntity;
}());
exports["default"] = BaseEntity;
