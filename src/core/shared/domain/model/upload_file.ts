interface UploadFileInit {
    resource_type?: string, 
    secure_url?: string, 
    public_id?: string , 
    folder?: string
}

export default class UploadFile{
    resource_type: string = "";
    secure_url: string = "";
    public_id: string = "";
    folder: string = "";
    name: string = "";
    constructor(resource_typeOrInit: string, secure_url?: string , public_id?: string , folder?: string )
    constructor(resource_typeOrInit: UploadFileInit)
    public constructor(resource_typeOrInit: string | UploadFileInit = "", secure_url: string = "", public_id: string = "", folder: string = ""){
        if(typeof resource_typeOrInit === 'string'){
            this.resource_type = resource_typeOrInit;
            this.secure_url = secure_url;
            this.public_id = public_id;
            this.folder = folder;
        }
        else{
            this.resource_type = resource_typeOrInit.resource_type ?? '';
            this.secure_url = resource_typeOrInit.secure_url ?? '';;
            this.public_id = resource_typeOrInit.public_id ?? '';;
            this.folder = resource_typeOrInit.folder ?? '';;
        }
    }
}