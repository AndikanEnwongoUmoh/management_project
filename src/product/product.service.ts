import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { error } from 'console';


@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepostory:Repository<Product>){}
  async createProduct(payload) {
    return await this.productRepostory.save(payload);
  }

  async findAll() {
    return await this.productRepostory.find();
  }

  async findOne(name:string) {
    const find = this.productRepostory.findOne({where:{name: name}});
    if(!find)
      throw new error ('id not found')
    return find
  }

  async updateProduct(name:string, payload) {
    const find = this.productRepostory.findOne({where:{name: name}});
    if(!find){
      throw new error(`product not found`)
    }
    return await this.productRepostory.update(name, payload)
  }

  async removePoduct(name: string) {
    const find = this.productRepostory.findBy({name})
    if(!find){
      throw new error(`product not found`)
    }
    return await this.productRepostory.delete(name)
  }
}
