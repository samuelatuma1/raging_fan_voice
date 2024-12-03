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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const cloudinary_1 = require("cloudinary");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const cloudinary_config_1 = require("../../../application/utils/config/cloudinary_config");
const upload_file_1 = __importDefault(require("../../../domain/model/upload_file"));
const serialization_utility_1 = __importDefault(require("../../../application/utils/utilities/serialization_utility"));
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
let CloudinaryService = class CloudinaryService {
    cloudinaryConfig;
    eventTracer;
    constructor(cloudinaryConfig, eventTracer) {
        this.cloudinaryConfig = cloudinaryConfig;
        this.eventTracer = eventTracer;
        cloudinary_1.v2.config({
            cloud_name: cloudinaryConfig.CLOUD_NAME,
            api_key: cloudinaryConfig.API_KEY,
            api_secret: cloudinaryConfig.API_SECRET,
            secure: true
        });
        this.eventTracer = eventTracer;
    }
    uploadFile = async (file) => {
        try {
            let kwargs = {};
            this.eventTracer.say(`Creating file in Folder: ${file.folder} with name ${file.name ?? file.secure_url}`);
            this.eventTracer.request = file;
            if (file.resource_type)
                kwargs.resource_type = file.resource_type;
            if (file.folder)
                kwargs.folder = file.folder;
            if (file.public_id)
                kwargs.public_id = file.public_id;
            const response = await cloudinary_1.v2.uploader.upload(file.secure_url, kwargs);
            this.eventTracer.response = response;
            this.eventTracer.isSuccessWithMessage("Successfully created file");
            this.deleteFileFromDisk(file.secure_url); // No need to await deleting, just delete
            if (response && response.public_id) {
                return new upload_file_1.default(response.resource_type, response.secure_url, response.public_id, response.folder);
            }
            return null;
        }
        catch (ex) {
            let errormsg = "";
            try {
                this.eventTracer.say(`Deleting disk file`);
                this.deleteFileFromDisk(file.secure_url); // No need to await deleting, just delete
                errormsg = serialization_utility_1.default.serializeJson(ex);
            }
            catch (exc) {
                this.eventTracer.say(`EXC : ${exc}`);
            }
            this.eventTracer.isExceptionWithMessage(`EXCEPTION: ${errormsg ?? ex}`);
            return null;
        }
    };
    uploadMultipleFiles = async (files) => {
        let allFilesToUpload = files.map(file => this.uploadFile(file));
        let results = await Promise.allSettled(allFilesToUpload);
        let uploadedFiles = [];
        for (let result of results) {
            if (result.status === "fulfilled" && result.value) {
                uploadedFiles.push(result.value);
            }
            else if (result.status === "rejected") {
                this.eventTracer.isExceptionWithMessage(`Failed to upload file: ${result.reason}`);
            }
        }
        return uploadedFiles;
    };
    deleteFile = async (publicId) => {
        const eventTracer = this.eventTracer.instance();
        try {
            if (!publicId) {
                return null;
            }
            eventTracer.say(`"Deleting file with public id ${publicId}`);
            const response = await cloudinary_1.v2.uploader.destroy(publicId);
            eventTracer.isSuccessWithResponseAndMessage(response, "Successfully deleted");
        }
        catch (ex) {
            eventTracer.isExceptionWithMessage(`${ex}`);
            return null;
        }
    };
    deletMultipleFiles = async (publicIds) => {
        const eventTracer = this.eventTracer.instance();
        try {
            let allFilesToDelete = publicIds.map(id => this.deleteFile(id));
            await Promise.allSettled(allFilesToDelete);
        }
        catch (ex) {
            eventTracer.isExceptionWithMessage(`${ex}`);
            return null;
        }
    };
    deleteFileFromDisk = async (url) => {
        try {
            let deleted = await fs_1.promises.unlink(path_1.default.join(process.cwd(), url));
            console.log({ deleted });
        }
        catch (ex) {
            console.error(`file in path ${url} not deleted with error: ${ex}`);
        }
    };
};
CloudinaryService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(cloudinary_config_1.IICloudinaryConfig)),
    __param(1, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __metadata("design:paramtypes", [Object, Object])
], CloudinaryService);
exports.default = CloudinaryService;
//# sourceMappingURL=file_service.js.map