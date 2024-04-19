import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>) {}
  async create(payload: CreateUserDto) {
    payload.email = payload.email.toLowerCase();
    const {email, password, ...rest}=payload
    const user = await this.userRepo.findOne({where:{email}})
    if(user){
        throw new HttpException('Sorry this user with this email already exists', 400)
    }
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userRepo.save({email, password:hashPassword, ...rest})
    delete user.password;
    return user;
    } catch (error) {
      if (error.code === '22P02'){
        throw new BadRequestException('admin role should be in lowercase')
      }
      return error;
    }    
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
