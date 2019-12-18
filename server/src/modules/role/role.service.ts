import { Injectable } from '@nestjs/common';
import { CustomRoleRepository } from './role.repository';
import { Role } from './entity/role.entity';
import { User } from '../user/entity/user.entity';
import { paginate, Pagination } from '../../common/page';
import { NewRoleInput, RolePageArgs, UpdateRoleInput } from './dto';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/entity/permission.entity';
import { errorUtil, curdUtil } from '../../utils';
import { AuthUser } from '../auth/models/auth-user';

const CLS_NAME = 'RoleService';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: CustomRoleRepository, private readonly permissionService: PermissionService) {}

  async findByIds(user: User): Promise<Role[]> {
    return await this.roleRepository.findByIds(
      user.roles.map(item => item.id),
      { relations: ['permissions'] },
    );
  }

  async roles(args: RolePageArgs): Promise<Pagination<Role>> {
    return await paginate(this.roleRepository, { pageNumber: args.pn, pageSize: args.ps }, { order: { createDate: 'DESC' } });
  }

  async role(id: number): Promise<Role> {
    return await this.roleRepository.findOne(id, { relations: ['permissions'] });
  }

  async createRole(args: NewRoleInput): Promise<Role> {
    return this.roleRepository.save({
      ...args,
      createDate: new Date(),
    });
  }

  async updateRole(id: number, args: UpdateRoleInput): Promise<Role> {
    const find = await this.roleRepository.findOne(id);
    if (!find) {
      return errorUtil.ERROR({ error: { message: 'role没找到', CLS_NAME } });
    }
    let relationArgs: { permissions?: Permission[] } = {};
    if (args.permissionIds && Array.isArray(args.permissionIds)) {
      const permissions = await this.permissionService.findPermissionsByIds(args.permissionIds);
      if (permissions) {
        relationArgs.permissions = permissions;
      }
    }
    return await this.roleRepository.save({
      ...find,
      ...args,
      ...relationArgs,
    });
  }

  async deleteRole(id: number, user: AuthUser): Promise<Role | undefined> {
    return curdUtil.commonDelete(this.roleRepository, CLS_NAME, id, user);
  }
}
