"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_file_1 = __importDefault(require("../../core/shared/domain/model/upload_file"));
class BaseController {
    convertReqFileToUploadFile = (req) => {
        try {
            return new upload_file_1.default({ secure_url: req.file.path });
        }
        catch (ex) {
            console.log(`An exception occured while converting Req file to upload file: ${ex} `);
            return null;
        }
    };
    convertReqFilesToUploadFiles = (req, fieldName = null) => {
        let uploadFiles = [];
        try {
            let files = req.files ?? null;
            if (Array.isArray(files)) {
                uploadFiles = files.map(file => new upload_file_1.default({ secure_url: file.path }));
            }
            else {
                uploadFiles = files?.[fieldName]?.map(file => new upload_file_1.default({ secure_url: file.path })) ?? [];
            }
            return uploadFiles;
        }
        catch (ex) {
            console.log(`An exception occured while converting Req files to upload files: ${ex} `);
            return uploadFiles;
        }
    };
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map