import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterDto from './dto/create-user.dto';
import Users from './entities/user.entity';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  public async findUser(name: object): Promise<Users> {
    return this.userRepository.findOne(name);
  }

  public async create(userDto: any): Promise<Users> {
    const user = new Users();
    user.email = userDto.name;
    user.name = userDto.email;
    user.password = userDto.password;
    const createUserOb = this.userRepository.create(user);
    return this.userRepository.save(createUserOb);
  }

  findAll() {
    return `This action returns all users`;
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
