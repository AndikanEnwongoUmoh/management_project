import { Column, Entity } from "typeorm";
import { userRole } from "../enum/role.enum";
import { Base } from "./base/base.entity";

@Entity({name:'User', schema: 'public'})
export class User extends Base{
    @Column()
    username: string;

    @Column()
    password: string;

    @Column({unique: true})
    email: string;

    @Column({
        type: 'enum',
        enum: userRole,
        default: userRole.member
    })
    role: userRole
}