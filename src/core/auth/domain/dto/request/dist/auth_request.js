"use strict";
exports.__esModule = true;
exports.ValidateAccessCodeResponse = exports.CreateUserRequest = exports.CreateRoleRequest = exports.CreatePermissionRequest = void 0;
var CreatePermissionRequest = /** @class */ (function () {
    function CreatePermissionRequest() {
        this.desc = "";
    }
    return CreatePermissionRequest;
}());
exports.CreatePermissionRequest = CreatePermissionRequest;
var CreateRoleRequest = /** @class */ (function () {
    function CreateRoleRequest() {
        this.desc = "";
    }
    return CreateRoleRequest;
}());
exports.CreateRoleRequest = CreateRoleRequest;
var CreateUserRequest = /** @class */ (function () {
    function CreateUserRequest() {
        this.roles = [];
    }
    return CreateUserRequest;
}());
exports.CreateUserRequest = CreateUserRequest;
var ValidateAccessCodeResponse = /** @class */ (function () {
    /**
     *
     */
    function ValidateAccessCodeResponse(init) {
        var _a;
        this.codeSentByUser = init.codeSentByUser;
        this.isValidCode = init.isValidCode;
        this.expiresIn = (_a = init.expiresIn) !== null && _a !== void 0 ? _a : null;
    }
    return ValidateAccessCodeResponse;
}());
exports.ValidateAccessCodeResponse = ValidateAccessCodeResponse;
