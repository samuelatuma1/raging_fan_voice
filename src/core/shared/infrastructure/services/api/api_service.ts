import { injectable } from "tsyringe";
import { ApiRequest } from "../../../domain/model/api_service/dto/api_request";
import { ApiRequestContentType } from "../../../domain/model/api_service/enum/api_request";
import SerializationUtility from "../../../../../core/shared/application/utils/utilities/serialization_utility";
import { ApiException } from "../../../../../core/shared/application/utils/exceptions/api_exception";
import IApiService from "../../../../../core/shared/application/contract/services/api/api_service";


@injectable()
export class ApiService implements IApiService {
    public async apiRequest<IN, OUT>  (request: ApiRequest<IN>): Promise<OUT> {
        try{
            let headers: {[key: string]: string} = {
                'Content-Type': ApiRequestContentType.JSON,
            };
            if(request.headers?.contentType){
                headers['Content-Type'] = request.headers?.contentType
            }
            if(request.headers?.authorization){
                headers.authorization = request.headers?.authorization
            }
            let body;
            if(request.body){
                switch(headers['Content-Type']){
                    case ApiRequestContentType.JSON:
                        body = SerializationUtility.serializeJson(request.body as object)
                        break;

                    default:
                        break
                }

                console.log({body})
            }

            const response = await fetch(request.url, {
                method: request.method,
                headers,
                body
            })
            if(response.ok){
                let resp;
                switch (request.headers?.responseType){
                    case ApiRequestContentType.TEXT:
                        resp = await response.text() as OUT
                        break;
                    default:
                        resp = await response.json() as OUT
                }

                return resp
            }
            else{
                let res = await response.text()
                throw new ApiException(`${res}`)
            }
        } catch(ex){
            throw new ApiException(`${ex}`)
        }
        
    }
}