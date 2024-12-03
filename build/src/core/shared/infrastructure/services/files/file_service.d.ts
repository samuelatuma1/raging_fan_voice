import IFileService from "../../../application/contract/services/files/file_service";
import ICloudinaryConfig from "../../../application/utils/config/cloudinary_config";
import UploadFile from "../../../domain/model/upload_file";
import IEventTracer from "../../../application/contract/observability/event_tracer";
export default class CloudinaryService implements IFileService {
    private readonly cloudinaryConfig;
    private readonly eventTracer;
    constructor(cloudinaryConfig: ICloudinaryConfig, eventTracer: IEventTracer);
    uploadFile: (file: UploadFile) => Promise<UploadFile>;
    uploadMultipleFiles: (files: UploadFile[]) => Promise<UploadFile[]>;
    deleteFile: (publicId: string) => Promise<void>;
    deletMultipleFiles: (publicIds: string[]) => Promise<void>;
    deleteFileFromDisk: (url: string) => Promise<void>;
}
