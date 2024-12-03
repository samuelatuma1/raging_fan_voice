"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ApiService = void 0;
var tsyringe_1 = require("tsyringe");
var api_request_1 = require("../../../domain/model/api_service/enum/api_request");
var serialization_utility_1 = require("../../../../../core/shared/application/utils/utilities/serialization_utility");
var api_exception_1 = require("../../../../../core/shared/application/utils/exceptions/api_exception");
var ApiService = /** @class */ (function () {
    function ApiService() {
    }
    ApiService.prototype.apiRequest = function (request) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, Promise, function () {
            var headers, body, response, resp, _f, res, ex_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 10, , 11]);
                        headers = {
                            'Content-Type': api_request_1.ApiRequestContentType.JSON
                        };
                        if ((_a = request.headers) === null || _a === void 0 ? void 0 : _a.contentType) {
                            headers['Content-Type'] = (_b = request.headers) === null || _b === void 0 ? void 0 : _b.contentType;
                        }
                        if ((_c = request.headers) === null || _c === void 0 ? void 0 : _c.authorization) {
                            headers.authorization = (_d = request.headers) === null || _d === void 0 ? void 0 : _d.authorization;
                        }
                        body = void 0;
                        if (request.body) {
                            switch (headers['Content-Type']) {
                                case api_request_1.ApiRequestContentType.JSON:
                                    body = serialization_utility_1["default"].serializeJson(request.body);
                                    break;
                                default:
                                    break;
                            }
                            console.log({ body: body });
                        }
                        return [4 /*yield*/, fetch(request.url, {
                                method: request.method,
                                headers: headers,
                                body: body
                            })];
                    case 1:
                        response = _g.sent();
                        if (!response.ok) return [3 /*break*/, 7];
                        resp = void 0;
                        _f = (_e = request.headers) === null || _e === void 0 ? void 0 : _e.responseType;
                        switch (_f) {
                            case api_request_1.ApiRequestContentType.TEXT: return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        resp = (_g.sent());
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        resp = (_g.sent());
                        _g.label = 6;
                    case 6: return [2 /*return*/, resp];
                    case 7: return [4 /*yield*/, response.text()];
                    case 8:
                        res = _g.sent();
                        throw new api_exception_1.ApiException("" + res);
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        ex_1 = _g.sent();
                        throw new api_exception_1.ApiException("" + ex_1);
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ApiService = __decorate([
        tsyringe_1.injectable()
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
