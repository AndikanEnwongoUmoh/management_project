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

  async findOne(id: number) {
    const find = this.productRepostory.findOne({where:{id: id}});
    if(!find)
      throw new error ('id not found')
    return find
  }

  async updateProduct(id: number, payload) {
    const find = this.productRepostory.findOne({where:{id: id}});
    if(!find){
      throw new error(`product with id ${id} not found`)
    }
    return await this.productRepostory.update(id, payload)
  }

  async removePoduct(id: number) {
    const find = this.productRepostory.findBy({id})
    if(!find){
      throw new error(`product with id ${id} not found`)
    }
    return await this.productRepostory.delete(id)
  }
}
