"use strict";
exports.__esModule = true;
var upload_file_1 = require("../../core/shared/domain/model/upload_file");
var BaseController = /** @class */ (function () {
    function BaseController() {
        this.convertReqFileToUploadFile = function (req) {
            try {
                return new upload_file_1["default"]({ secure_url: req.file.path });
            }
            catch (ex) {
                console.log("An exception occured while converting Req file to upload file: " + ex + " ");
                return null;
            }
        };
        this.convertReqFilesToUploadFiles = function (req, fieldName) {
            var _a, _b, _c;
            if (fieldName === void 0) { fieldName = null; }
            var uploadFiles = [];
            try {
                var files = (_a = req.files) !== null && _a !== void 0 ? _a : null;
                if (Array.isArray(files)) {
                    uploadFiles = files.map(function (file) { return new upload_file_1["default"]({ secure_url: file.path }); });
                }
                else {
                    uploadFiles = (_c = (_b = files === null || files === void 0 ? void 0 : files[fieldName]) === null || _b === void 0 ? void 0 : _b.map(function (file) { return new upload_file_1["default"]({ secure_url: file.path }); })) !== null && _c !== void 0 ? _c : [];
                }
                return uploadFiles;
            }
            catch (ex) {
                console.log("An exception occured while converting Req files to upload files: " + ex + " ");
                return uploadFiles;
            }
        };
    }
    return BaseController;
}());
exports["default"] = BaseController;
