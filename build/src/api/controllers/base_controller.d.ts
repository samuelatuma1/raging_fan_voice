import UploadFile from '../../core/shared/domain/model/upload_file';
import { Request } from 'express';
export default class BaseController {
    protected convertReqFileToUploadFile: (req: Request) => UploadFile;
    protected convertReqFilesToUploadFiles: (req: Request, fieldName?: string | null) => UploadFile[];
}
