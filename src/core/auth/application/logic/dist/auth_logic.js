"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var permission_1 = require("../../../../core/auth/domain/entity/permission");
var tsyringe_1 = require("tsyringe");
var permission_repository_1 = require("../contract/persistence/permission_repository");
var duplicate_exception_1 = require("../../../../core/shared/application/utils/exceptions/duplicate_exception");
var role_repository_1 = require("../contract/persistence/role_repository");
var role_1 = require("../../../../core/auth/domain/entity/role");
var auth_request_1 = require("../../domain/dto/request/auth_request");
var user_1 = require("../../../../core/auth/domain/entity/user");
var create_user_validation_1 = require("./validations/create_user_validation");
var object_utility_1 = require("../../../../core/shared/application/utils/utilities/object_utility");
var validation_exception_1 = require("../../../../core/shared/application/utils/exceptions/validation_exception");
var user_repository_1 = require("../contract/persistence/user_repository");
var file_service_1 = require("../../../../core/shared/application/contract/services/files/file_service");
var mongoose_1 = require("mongoose");
var jwt_service_1 = require("../contract/service/jwt_service");
var event_tracer_1 = require("../../../../core/shared/application/contract/observability/event_tracer");
var cache_service_1 = require("../../../../core/shared/application/contract/data_access/cache/cache_service");
var mail_service_1 = require("../../../../core/chat/application/contract/service/mail_service");
var random_utility_1 = require("../../../../core/shared/application/utils/utilities/random_utility");
var date_utility_1 = require("../../../../core/shared/application/utils/utilities/date_utility");
var AuthLogic = /** @class */ (function () {
    function AuthLogic(userPermissionRepository, userRoleRepository, userRepository, cacheService, fileService, jwtService, mailService, eventTracer) {
        var _this = this;
        this.userPermissionRepository = userPermissionRepository;
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
        this.cacheService = cacheService;
        this.fileService = fileService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.eventTracer = eventTracer;
        this.UserCachePrefix = "USER_";
        this.AccessCodeCachePrefix = "ACCESS_CODE_";
        this.createPermission = function (createPermissionRequest) { return __awaiter(_this, void 0, Promise, function () {
            var permissionExists, permissionToSave;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userPermissionRepository.firstOrDefaultAsync({ name: createPermissionRequest.name })];
                    case 1:
                        permissionExists = _b.sent();
                        if (permissionExists) {
                            throw new duplicate_exception_1["default"]("Permission with name already exists: " + createPermissionRequest.name);
                        }
                        permissionToSave = new permission_1["default"]({ name: createPermissionRequest.name, desc: (_a = createPermissionRequest.desc) !== null && _a !== void 0 ? _a : "" });
                        return [4 /*yield*/, this.userPermissionRepository.addAsync(permissionToSave)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        }); };
        this.createRole = function (createRoleRequest) { return __awaiter(_this, void 0, Promise, function () {
            var roleExists, rolePermissions, permissionsIds, roleToSave;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userRoleRepository.firstOrDefaultAsync({ name: createRoleRequest.name })];
                    case 1:
                        roleExists = _b.sent();
                        if (roleExists) {
                            throw new duplicate_exception_1["default"]("Role with name already exists: " + createRoleRequest.name);
                        }
                        return [4 /*yield*/, this.userPermissionRepository.contains({ name: createRoleRequest.permissionNames })];
                    case 2:
                        rolePermissions = _b.sent();
                        permissionsIds = rolePermissions.map(function (permission) { return permission._id; });
                        roleToSave = new role_1["default"]({ name: createRoleRequest.name, desc: (_a = createRoleRequest.desc) !== null && _a !== void 0 ? _a : "", permissions: permissionsIds });
                        return [4 /*yield*/, this.userRoleRepository.addAsync(roleToSave)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        }); };
        this.createUser = function (newUser) { return __awaiter(_this, void 0, Promise, function () {
            var evtTracer, createUserValidator, _a, userRoles, rolesIds, savedUser, dbSavedUser, jwtPayload, token, signedInUser, ex_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        evtTracer = this.eventTracer.instance();
                        evtTracer.say("Create user");
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        evtTracer.say("Validating");
                        createUserValidator = new create_user_validation_1["default"]().validate(newUser);
                        if (object_utility_1["default"].objectSize(createUserValidator)) {
                            throw new validation_exception_1["default"]("Validation error occured", createUserValidator);
                        }
                        if (!newUser.profilePicture) return [3 /*break*/, 3];
                        evtTracer.say("Saving profile picture");
                        _a = newUser;
                        return [4 /*yield*/, this.fileService.uploadFile(newUser.profilePicture)];
                    case 2:
                        _a.profilePicture = _c.sent();
                        _c.label = 3;
                    case 3:
                        evtTracer.say("Getting and adding default roles");
                        userRoles = (_b = newUser.roles) !== null && _b !== void 0 ? _b : [];
                        userRoles.push("user");
                        rolesIds = [];
                        if (!userRoles.length) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.userRoleRepository.contains({ name: userRoles })];
                    case 4:
                        rolesIds = (_c.sent()).map(function (role) { return role._id; });
                        _c.label = 5;
                    case 5:
                        evtTracer.say("Saving user");
                        savedUser = new user_1["default"](__assign(__assign({}, newUser), { roles: rolesIds }));
                        return [4 /*yield*/, this.userRepository.addAsync(savedUser)];
                    case 6:
                        dbSavedUser = _c.sent();
                        evtTracer.say("Creating jwt token");
                        return [4 /*yield*/, this.createJwtPayload(dbSavedUser)];
                    case 7:
                        jwtPayload = _c.sent();
                        token = this.jwtService.encode(jwtPayload, 60 * 60 * 24 * 7);
                        signedInUser = dbSavedUser;
                        signedInUser.roles = jwtPayload.roles.map(function (role) { return role.name; });
                        signedInUser.token = token;
                        evtTracer.isSuccessWithResponseAndMessage(signedInUser);
                        return [2 /*return*/, signedInUser];
                    case 8:
                        ex_1 = _c.sent();
                        evtTracer.isExceptionWithMessage(ex_1.message);
                        throw ex_1;
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getUser = function (id, options) {
            if (options === void 0) { options = { useCache: true }; }
            return __awaiter(_this, void 0, Promise, function () {
                var user, cacheKey;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cacheKey = "" + this.UserCachePrefix + id;
                            if (!options.useCache) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.cacheService.getAsync(cacheKey)];
                        case 1:
                            user = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!!user) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.userRepository.getByIdAsync(new mongoose_1.Types.ObjectId(id))];
                        case 3:
                            user = _a.sent();
                            if (user) {
                                this.cacheService.addAsync(cacheKey, user, 60 * 30);
                            }
                            _a.label = 4;
                        case 4: return [2 /*return*/, user];
                    }
                });
            });
        };
        this.createJwtPayload = function (user) { return __awaiter(_this, void 0, Promise, function () {
            var rolesAndPermissions, permissions, _i, rolesAndPermissions_1, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRoleRepository.contains({ _id: user.roles }, { permissions: true })];
                    case 1:
                        rolesAndPermissions = _a.sent();
                        permissions = [];
                        for (_i = 0, rolesAndPermissions_1 = rolesAndPermissions; _i < rolesAndPermissions_1.length; _i++) {
                            role = rolesAndPermissions_1[_i];
                            permissions = __spreadArrays(permissions, (role.permissions.filter(function (permission) { return permission !== null; })).map(function (permission) { return permission; }));
                        }
                        return [2 /*return*/, __assign(__assign({}, user), { roles: rolesAndPermissions, permissions: permissions })];
                }
            });
        }); };
        this.generateCode = function () { return __awaiter(_this, void 0, Promise, function () {
            var generatedNumber, durationInSeconds, expiresIn, validateAccessCodeResponse, notificationRecipients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        generatedNumber = random_utility_1["default"].randomNumbersAsString(4);
                        durationInSeconds = 60 * 60 * 3;
                        expiresIn = date_utility_1["default"].addTimeToCurrentTime(durationInSeconds);
                        validateAccessCodeResponse = new auth_request_1.ValidateAccessCodeResponse({
                            codeSentByUser: generatedNumber,
                            isValidCode: true,
                            expiresIn: expiresIn
                        });
                        return [4 /*yield*/, this.cacheService.addAsync(this.AccessCodeCachePrefix, validateAccessCodeResponse, durationInSeconds)
                            // send to admin's mail
                        ];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getUsersWithPermission("admin")];
                    case 2:
                        notificationRecipients = _a.sent();
                        return [4 /*yield*/, this.mailService.sendMailToMultipleRecipients(notificationRecipients.map(function (rec) { return rec.email; }), "Raging Fan access Code", "ACCESS CODE: " + generatedNumber + " <br/> Expires in " + expiresIn)
                            // return code
                        ];
                    case 3:
                        _a.sent();
                        // return code
                        return [2 /*return*/, validateAccessCodeResponse];
                }
            });
        }); };
        this.isValidAccessCode = function (code) { return __awaiter(_this, void 0, Promise, function () {
            var accessCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cacheService.getAsync(this.AccessCodeCachePrefix)];
                    case 1:
                        accessCode = _a.sent();
                        console.log({ accessCode: accessCode, code: code });
                        if (!accessCode) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, accessCode.codeSentByUser === code];
                }
            });
        }); };
        this.validateAccessCode = function (code) { return __awaiter(_this, void 0, Promise, function () {
            var accessCode, wrongcode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cacheService.getAsync(this.AccessCodeCachePrefix)];
                    case 1:
                        accessCode = _a.sent();
                        console.log({ accessCode: accessCode, code: code });
                        wrongcode = new auth_request_1.ValidateAccessCodeResponse({
                            isValidCode: false,
                            codeSentByUser: code
                        });
                        if (!accessCode) {
                            console.log("No access code generated");
                            return [2 /*return*/, wrongcode];
                        }
                        else if (accessCode.codeSentByUser === code) {
                            console.log("Wrong access code");
                            return [2 /*return*/, accessCode];
                        }
                        return [2 /*return*/, wrongcode];
                }
            });
        }); };
        this.getUsersWithPermission = function (permissionName) { return __awaiter(_this, void 0, Promise, function () {
            var userPermission, rolesWithPermission, rolesId, users, _i, rolesId_1, roleId, usersWithRoles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userPermissionRepository.firstOrDefaultAsync({ name: permissionName })];
                    case 1:
                        userPermission = _a.sent();
                        console.log(userPermission);
                        if (!userPermission) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.userRoleRepository.getAsync({ permissions: [userPermission._id] })];
                    case 2:
                        rolesWithPermission = _a.sent();
                        console.log({ userPermission: userPermission, rolesWithPermission: rolesWithPermission });
                        if (!rolesWithPermission) {
                            return [2 /*return*/, []];
                        }
                        rolesId = rolesWithPermission.map(function (role) { return role._id; });
                        users = [];
                        _i = 0, rolesId_1 = rolesId;
                        _a.label = 3;
                    case 3:
                        if (!(_i < rolesId_1.length)) return [3 /*break*/, 6];
                        roleId = rolesId_1[_i];
                        return [4 /*yield*/, this.userRepository.getAsync({ roles: roleId })];
                    case 4:
                        usersWithRoles = _a.sent();
                        users = __spreadArrays(users, usersWithRoles);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        console.log({ users: users, rolesId: rolesId });
                        return [2 /*return*/, users];
                }
            });
        }); };
    }
    AuthLogic = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(permission_repository_1.IIUserPermissionRepository)),
        __param(1, tsyringe_1.inject(role_repository_1.IIUserRoleRepository)),
        __param(2, tsyringe_1.inject(user_repository_1.IIUserRepository)),
        __param(3, tsyringe_1.inject(cache_service_1.IICacheService)),
        __param(4, tsyringe_1.inject(file_service_1.IIFileService)),
        __param(5, tsyringe_1.inject(jwt_service_1.IIJwtService)),
        __param(6, tsyringe_1.inject(mail_service_1.IIMailService)),
        __param(7, tsyringe_1.inject(event_tracer_1.IIEventTracer))
    ], AuthLogic);
    return AuthLogic;
}());
exports["default"] = AuthLogic;
