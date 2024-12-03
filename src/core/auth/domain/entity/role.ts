import { Types } from "mongoose";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";
import UserPermission from "./permission";

export interface UserRoleInit {
    name: string;
    desc: string;
     permissions: (Types.ObjectId)[]
}
export default class UserRole extends BaseEntity<Types.ObjectId> {
    public name: string;
    public desc: string;
    public permissions: UserPermission[] | Types.ObjectId[]
    public constructor(init: UserRoleInit){
        super(new Types.ObjectId())
        this.name = init.name;
        this.desc = init.desc;
        this.permissions = init.permissions;
    }
}