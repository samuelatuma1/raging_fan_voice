"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var base_repository_1 = require("../../../../../core/shared/infrastructure/persistence/data_access/base_repository");
var tsyringe_1 = require("tsyringe");
var user_role_config_1 = require("../config/user_role_config");
var UserRoleRepository = /** @class */ (function (_super) {
    __extends(UserRoleRepository, _super);
    function UserRoleRepository() {
        return _super.call(this, user_role_config_1.userRoleModel) || this;
    }
    UserRoleRepository = __decorate([
        tsyringe_1.injectable()
    ], UserRoleRepository);
    return UserRoleRepository;
}(base_repository_1.BaseRepository));
exports["default"] = UserRoleRepository;
