import { ApiRequestContentType, ApiRequestMethod } from "../enum/api_request";
export interface ApiRequestInit<T> {
    method: ApiRequestMethod;
    url: string;
    headers?: {
        contentType: ApiRequestContentType;
        authorization?: string;
        responseType?: ApiRequestContentType;
    };
    body?: T;
}
export declare class ApiRequest<T> {
    method: ApiRequestMethod;
    url: string;
    headers?: {
        contentType: ApiRequestContentType;
        authorization?: string;
        responseType?: ApiRequestContentType;
    };
    body?: T;
    constructor(init: ApiRequestInit<T>);
}
