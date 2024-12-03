"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequest = void 0;
const api_request_1 = require("../enum/api_request");
class ApiRequest {
    method = api_request_1.ApiRequestMethod.GET;
    url;
    headers;
    body;
    constructor(init) {
        this.method = init.method;
        this.url = init.url;
        this.headers = init.headers;
        this.body = init.body;
    }
}
exports.ApiRequest = ApiRequest;
//# sourceMappingURL=api_request.js.map