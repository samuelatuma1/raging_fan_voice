import { ApiRequest } from "../../../../../../core/shared/domain/model/api_service/dto/api_request";
export default interface IApiService {
    apiRequest<IN, OUT>(request: ApiRequest<IN>): Promise<OUT>;
}
export declare const IIApiService = "IApiService";
