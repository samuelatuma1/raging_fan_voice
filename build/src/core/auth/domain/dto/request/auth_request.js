"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateAccessCodeResponse = exports.CreateUserRequest = exports.CreateRoleRequest = exports.CreatePermissionRequest = void 0;
class CreatePermissionRequest {
    name;
    desc = "";
}
exports.CreatePermissionRequest = CreatePermissionRequest;
class CreateRoleRequest {
    name;
    desc = "";
    permissionNames;
}
exports.CreateRoleRequest = CreateRoleRequest;
class CreateUserRequest {
    name;
    profilePicture;
    email;
    roles = [];
}
exports.CreateUserRequest = CreateUserRequest;
class ValidateAccessCodeResponse {
    codeSentByUser;
    isValidCode;
    expiresIn;
    /**
     *
     */
    constructor(init) {
        this.codeSentByUser = init.codeSentByUser;
        this.isValidCode = init.isValidCode;
        this.expiresIn = init.expiresIn ?? null;
    }
}
exports.ValidateAccessCodeResponse = ValidateAccessCodeResponse;
//# sourceMappingURL=auth_request.js.map