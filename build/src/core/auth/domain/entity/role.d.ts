import { Types } from "mongoose";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
import UserPermission from "./permission";
export interface UserRoleInit {
    name: string;
    desc: string;
    permissions: (Types.ObjectId)[];
}
export default class UserRole extends BaseEntity<Types.ObjectId> {
    name: string;
    desc: string;
    permissions: UserPermission[] | Types.ObjectId[];
    constructor(init: UserRoleInit);
}
