"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("../../../../../core/shared/infrastructure/persistence/data_access/base_repository");
const message_config_1 = require("../config/message_config");
let MessageRepository = class MessageRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(message_config_1.messageModel);
    }
};
MessageRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], MessageRepository);
exports.default = MessageRepository;
//# sourceMappingURL=message_repository.js.map