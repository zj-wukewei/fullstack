import { EntityRepository, Repository } from 'typeorm';
import { Permission } from './entity/permission.entity';

@EntityRepository(Permission)
export class CustomPermissionRepository extends Repository<Permission> {}
