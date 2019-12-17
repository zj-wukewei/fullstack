import { Injectable } from '@nestjs/common';
import { CustomRoleRepository } from './role.repository';
import { Role } from './entity/role.entity';
import { User } from '../user/entity/user.entity';
import BasePageArgs from '../../common/page/base-page-args';
import { paginate, Pagination } from '../../common/page';
import { NewRoleInput } from './dto/new-role-input';
import { PermissionService } from '../permission/permission.service'
import { UpdateRoleInput } from './dto/update-role-input';
import { Permission } from '../permission/entity/permission.entity';
import { CommonException } from '../../common/exception/common-exception';
import { errorUtil } from '../../utils/error.utils';

const CLS_NAME = "RoleService";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: CustomRoleRepository, private readonly permissionService: PermissionService,) {}

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

  async updateRole(id: number, args: UpdateRoleInput): Promise<Role> {
    const find = await this.roleRepository.findOne(id);
    if (!find) {
      return errorUtil.ERROR({ error: { message: "role没找到", CLS_NAME }  })
    }
    let relationArgs: { permissions?: Permission[] }  = {};
    if (args.permissionIds &&  Array.isArray(args.permissionIds)) {
      const permissions = await this.permissionService.findPermissionsByIds(args.permissionIds);
      if (permissions) {
        relationArgs.permissions = permissions;
      }
    }
    return await this.roleRepository.save({
      ...find,
      ...args,
      ...relationArgs
    });
  }
}
