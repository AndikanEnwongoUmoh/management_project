import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/role.guard';
import { userRole } from 'src/enum/role.enum';
import { Roles } from 'src/guard/role';

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

  @Get()
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles(userRole.admin, userRole.manager)
  findAll() {
    return this.userService.getAllUser()
  }
}