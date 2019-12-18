import { Injectable } from '@nestjs/common';
import { CustomPermissionRepository } from './permission.repository';
import { Permission } from './entity/permission.entity';
import { PermissionPageArgs, NewPermissionInput } from './dto';
import { paginate, Pagination } from '../../common/page';
import { AuthUser } from '../auth/models/auth-user';
import { curdUtil } from '../../utils';

const CLS_NAME = 'PermissionService';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: CustomPermissionRepository) {}

  async findPermissionsByIds(ids: number[]): Promise<Permission[]> {
    return await this.permissionRepository.findByIds(ids);
  }

  async permissions(args: PermissionPageArgs): Promise<Pagination<Permission>> {
    return await paginate(
      this.permissionRepository,
      { pageNumber: args.pn, pageSize: args.ps },
      { order: { createDate: 'DESC' } },
    );
  }

  async createPermission(args: NewPermissionInput): Promise<Permission> {
    return await this.permissionRepository.save({
      ...args,
      createDate: new Date(),
    });
  }

  async deletePermission(id: number, user: AuthUser): Promise<Permission | undefined> {
    return curdUtil.commonDelete(this.permissionRepository, CLS_NAME, id, user);
  }
}
