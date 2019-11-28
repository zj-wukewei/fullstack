import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CustomUserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: CustomUserRepository) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['info'] });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOneByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOneByPhone(phone);
  }
}
