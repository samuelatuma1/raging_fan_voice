"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const tsyringe_1 = require("tsyringe");
const api_request_1 = require("../../../domain/model/api_service/enum/api_request");
const serialization_utility_1 = __importDefault(require("../../../../../core/shared/application/utils/utilities/serialization_utility"));
const api_exception_1 = require("../../../../../core/shared/application/utils/exceptions/api_exception");
let ApiService = class ApiService {
    async apiRequest(request) {
        try {
            let headers = {
                'Content-Type': api_request_1.ApiRequestContentType.JSON,
            };
            if (request.headers?.contentType) {
                headers['Content-Type'] = request.headers?.contentType;
            }
            if (request.headers?.authorization) {
                headers.authorization = request.headers?.authorization;
            }
            let body;
            if (request.body) {
                switch (headers['Content-Type']) {
                    case api_request_1.ApiRequestContentType.JSON:
                        body = serialization_utility_1.default.serializeJson(request.body);
                        break;
                    default:
                        break;
                }
                console.log({ body });
            }
            const response = await fetch(request.url, {
                method: request.method,
                headers,
                body
            });
            if (response.ok) {
                let resp;
                switch (request.headers?.responseType) {
                    case api_request_1.ApiRequestContentType.TEXT:
                        resp = await response.text();
                        break;
                    default:
                        resp = await response.json();
                }
                return resp;
            }
            else {
                let res = await response.text();
                throw new api_exception_1.ApiException(`${res}`);
            }
        }
        catch (ex) {
            throw new api_exception_1.ApiException(`${ex}`);
        }
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, tsyringe_1.injectable)()
], ApiService);
//# sourceMappingURL=api_service.js.map