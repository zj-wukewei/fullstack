import { Injectable } from '@nestjs/common';
import { CustomPermissionRepository } from './permission.repository';
import { Permission } from './entity/permission.entity';


@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: CustomPermissionRepository) {}


  async findPermissionsByIds(ids: number[]): Promise<Permission[]> {
    return await this.permissionRepository.findByIds(ids);
  }

}
