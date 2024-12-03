import { ApiRequest } from "../../../domain/model/api_service/dto/api_request";
import IApiService from "../../../../../core/shared/application/contract/services/api/api_service";
export declare class ApiService implements IApiService {
    apiRequest<IN, OUT>(request: ApiRequest<IN>): Promise<OUT>;
}
