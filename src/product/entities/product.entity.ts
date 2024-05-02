import { Base } from "src/entity/base/base.entity";
import { User } from "src/entity/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
@Entity('name: products')
export class Product extends Base {
    
    @Column()   
    name: string
    
    @Column()
    description:string
    
    @Column()
    brand:string
    
    @Column()
    price:number
    
    @Column()
    isEmpty: boolean


    @ManyToOne(() => User, (user) => user.product)
    user: User
}
