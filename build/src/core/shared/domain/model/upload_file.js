"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UploadFile {
    resource_type = "";
    secure_url = "";
    public_id = "";
    folder = "";
    name = "";
    constructor(resource_typeOrInit = "", secure_url = "", public_id = "", folder = "") {
        if (typeof resource_typeOrInit === 'string') {
            this.resource_type = resource_typeOrInit;
            this.secure_url = secure_url;
            this.public_id = public_id;
            this.folder = folder;
        }
        else {
            this.resource_type = resource_typeOrInit.resource_type ?? '';
            this.secure_url = resource_typeOrInit.secure_url ?? '';
            ;
            this.public_id = resource_typeOrInit.public_id ?? '';
            ;
            this.folder = resource_typeOrInit.folder ?? '';
            ;
        }
    }
}
exports.default = UploadFile;
//# sourceMappingURL=upload_file.js.map