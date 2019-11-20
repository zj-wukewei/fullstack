import { Injectable } from '@nestjs/common';
import { User as UserEntity } from './users.entity';
import { CustomUserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: CustomUserRepository) {}

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }
}
