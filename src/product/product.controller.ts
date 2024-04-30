import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return await this.productService.createProduct(payload);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return await this.productService.findOne(name);
  }

  @Put(':name')
  async update(@Param('name') name: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.updateProduct(name, updateProductDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.productService.removePoduct(name);
  }
}
