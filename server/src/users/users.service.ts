import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CustomUserRepository } from './repository/users.repository';
import { CustomRoleRepository } from './repository/roles.repository';
import { CommonException } from '../common/exception/common-exception';
import BasePageArgs from '../common/page/base-page-args';
import { paginate, Pagination } from '../common/page';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: CustomUserRepository, private readonly roleRepository: CustomRoleRepository) {}

  async create(user: User): Promise<User> {
    const findUser = await this.userRepository.findOneByPhone(user.phone);
    if (findUser) {
      throw new CommonException('用户已存在');
    }
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['info'], order: { createDate: 'DESC' } });
  }

  async users(args: BasePageArgs): Promise<Pagination<User>> {
    return await paginate(this.userRepository, { pageNumber: args.pn, pageSize: args.ps }, { order: { createDate: 'DESC' } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id, { relations: ['info'] });
  }

  async findOneByPhone(phone: string): Promise<User> {
    const user = await this.userRepository.findOneByPhone(phone);
    if (!user) {
      throw new NotFoundException;
    }
    const roles = user.roles && await this.roleRepository.findByIds(user.roles.map(item => item.id), { relations: ['permissions'] });
    user.roles = roles;
    return user;
  }
}
