import { Types } from "mongoose";
import BaseEntity from "../../../../core/shared/domain/entity/base_entity";

export interface UserPermissionInit {
    name: string;
    desc: string;
}
export default class UserPermission extends BaseEntity<Types.ObjectId> {
    public name: string;
    public desc: string;

    public constructor(init: UserPermissionInit){
        super(new Types.ObjectId())
        this.name = init.name;
        this.desc = init.desc;
    }
}