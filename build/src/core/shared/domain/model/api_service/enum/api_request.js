"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequestMethod = exports.ApiRequestContentType = void 0;
var ApiRequestContentType;
(function (ApiRequestContentType) {
    ApiRequestContentType["JSON"] = "application/json";
    ApiRequestContentType["PDF"] = "application/pdf";
    ApiRequestContentType["FORM_DATA"] = "multipart/form-data";
    ApiRequestContentType["TEXT"] = "text/plain";
})(ApiRequestContentType || (exports.ApiRequestContentType = ApiRequestContentType = {}));
var ApiRequestMethod;
(function (ApiRequestMethod) {
    ApiRequestMethod["GET"] = "GET";
    ApiRequestMethod["POST"] = "POST";
    ApiRequestMethod["PUT"] = "PUT";
    ApiRequestMethod["DELETE"] = "DELETE";
})(ApiRequestMethod || (exports.ApiRequestMethod = ApiRequestMethod = {}));
//# sourceMappingURL=api_request.js.map