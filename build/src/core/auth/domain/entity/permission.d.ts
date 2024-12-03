import { Types } from "mongoose";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
export interface UserPermissionInit {
    name: string;
    desc: string;
}
export default class UserPermission extends BaseEntity<Types.ObjectId> {
    name: string;
    desc: string;
    constructor(init: UserPermissionInit);
}
