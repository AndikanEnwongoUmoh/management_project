import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { Response } from 'express';

@Controller('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('login')
  async login(@Body() payload, @Res()res:Response) {
    return await this.userService.login(payload, res);
    
  }
}