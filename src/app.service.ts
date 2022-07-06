import { Injectable,Body, Req, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterDto from './users/v1/dto/create-user.dto';
import Users from './users/v1/entities/user.entity';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  public async createUser(userDto: any): Promise<Users> {
    const user = new Users();
    user.email = userDto.name;
    user.name = userDto.email;
    user.password = userDto.password;
    const createUserOb = this.userRepository.create(user);
    return this.userRepository.save(createUserOb);
  }


}
