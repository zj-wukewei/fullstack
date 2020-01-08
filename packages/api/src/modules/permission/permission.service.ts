import { Injectable } from '@nestjs/common';
import { AuthUser } from '@users/common/src/models';
import { PermissionPageArgs, NewPermissionInput } from '@users/common/src/dto';

import { CustomPermissionRepository } from './permission.repository';
import { Permission } from './entity/permission.entity';
import { paginate, Pagination } from '../../common/page';
import { curdUtil } from '../../utils';

const CLS_NAME = 'PermissionService';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: CustomPermissionRepository) {}

  async findPermissionsByIds(ids: number[]): Promise<Permission[]> {
    return this.permissionRepository.findByIds(ids);
  }

  async permissions(args: PermissionPageArgs): Promise<Pagination<Permission>> {
    return paginate(
      this.permissionRepository,
      { pageNumber: args.pn, pageSize: args.ps },
      { order: { createDate: 'DESC' } },
    );
  }

  async createPermission(args: NewPermissionInput): Promise<Permission> {
    return this.permissionRepository.save({
      ...args,
      createDate: new Date(),
    });
  }

  async deletePermission(id: number, user: AuthUser): Promise<Permission | undefined> {
    return curdUtil.commonDelete(this.permissionRepository, CLS_NAME, id, user);
  }
}
