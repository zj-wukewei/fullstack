import { Injectable } from '@nestjs/common';
import { CustomRoleRepository } from './role.repository';
import { Role } from './entity/role.entity';
import { User } from '../user/entity/user.entity';
import BasePageArgs from '../../common/page/base-page-args';
import { paginate, Pagination } from '../../common/page';
import { NewRoleInput } from './dto/new-role-input';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: CustomRoleRepository) {}

  async findByIds(user: User): Promise<Role[]> {
    return await this.roleRepository.findByIds(
      user.roles.map(item => item.id),
      { relations: ['permissions'] },
    );
  }

  async roles(args: BasePageArgs): Promise<Pagination<Role>> {
    return await paginate(this.roleRepository, { pageNumber: args.pn, pageSize: args.ps }, { order: { createDate: 'DESC' } });
  }

  async addRole(args: NewRoleInput): Promise<Role> {
    return this.roleRepository.save({
      ...args,
      createDate: new Date(),
    });
  }
}
