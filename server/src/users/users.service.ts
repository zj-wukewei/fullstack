import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CustomUserRepository } from './users.repository';
import { CommonException } from 'src/common/exception/common-exception';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: CustomUserRepository) {}

  async create(user: User): Promise<User> {
    const findUser = await this.findOneByPhone(user.phone);
    if (findUser) {
      throw new CommonException('用户已存在');
    }
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['info'] });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id, { relations: ['info'] });
  }

  async findOneByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOneByPhone(phone);
  }
}
