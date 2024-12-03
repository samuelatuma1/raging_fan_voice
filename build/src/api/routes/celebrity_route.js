"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrity_controller_1 = __importDefault(require("../../api/controllers/celebrity_controller"));
const multer_upload_1 = require("../../api/middlewares/multer_upload");
const program_1 = require("../../api/program");
const express_1 = require("express");
const celebrityController = program_1.iocContainer.resolve(celebrity_controller_1.default);
const celebrityRouter = (0, express_1.Router)();
celebrityRouter.post("/create", multer_upload_1.upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icons', maxCount: 4 }, { name: 'avatar', maxCount: 1 }]), celebrityController.createCelebrity);
celebrityRouter.post("/train", celebrityController.trainCelebrity);
celebrityRouter.post("/news", celebrityController.testAINews);
celebrityRouter.post("/chat", celebrityController.initiateChat);
celebrityRouter.get("/", celebrityController.getCelebrities);
celebrityRouter.post("/converse", celebrityController.chat);
exports.default = celebrityRouter;
//# sourceMappingURL=celebrity_route.js.map