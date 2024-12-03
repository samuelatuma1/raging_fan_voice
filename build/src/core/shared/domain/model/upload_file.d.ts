interface UploadFileInit {
    resource_type?: string;
    secure_url?: string;
    public_id?: string;
    folder?: string;
}
export default class UploadFile {
    resource_type: string;
    secure_url: string;
    public_id: string;
    folder: string;
    name: string;
    constructor(resource_typeOrInit: string, secure_url?: string, public_id?: string, folder?: string);
    constructor(resource_typeOrInit: UploadFileInit);
}
export {};
