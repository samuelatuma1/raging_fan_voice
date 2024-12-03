import { ApiRequestContentType, ApiRequestMethod } from "../enum/api_request";


export interface ApiRequestInit<T> {
    method: ApiRequestMethod,
    url: string,
    headers?: {
        contentType: ApiRequestContentType,
        authorization?: string,
        responseType?: ApiRequestContentType
    },
    body?: T
}
export class ApiRequest<T> {
    method: ApiRequestMethod = ApiRequestMethod.GET;
    url: string;
    headers?: {
        contentType: ApiRequestContentType,
        authorization?: string,
        responseType?: ApiRequestContentType
    };
    body?: T;
    public constructor(init: ApiRequestInit<T>){
            this.method = init.method;
            this.url = init.url;
            this.headers = init.headers;
            this.body = init.body;
            
        }
}   