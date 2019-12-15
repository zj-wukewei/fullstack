import { Injectable } from '@nestjs/common';
import { CustomRoleRepository } from './role.repository';
import { Role } from './entity/role.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: CustomRoleRepository) {}

  async findByIds(user: User): Promise<Role[]> {
    return await this.roleRepository.findByIds(
      user.roles.map(item => item.id),
      { relations: ['permissions'] },
    );
  }
}
