import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CustomUserRepository } from './users.repository';
import { CommonException } from '../common/exception/common-exception';
import { PageInfo } from '../common/page/page-info';
import BasePageArgs from '../common/page/base-page-args';
import { UserPageInfo } from './models/user-page';

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
    return await this.userRepository.find({ relations: ['info'], order: { createDate: 'DESC' } });
  }

  async users(args: BasePageArgs): Promise<UserPageInfo> {
    const totalSize = await this.userRepository.count();
    const users = await this.userRepository.find({
      relations: ['info'],
      order: { createDate: 'DESC' },
      skip: args.pn * args.ps,
      take: args.ps,
    });
    return UserPageInfo.createPageInfo(totalSize, users);
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id, { relations: ['info'] });
  }

  async findOneByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOneByPhone(phone);
  }
}
