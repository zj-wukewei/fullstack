import { EntityRepository, Repository } from 'typeorm';
import { Role } from './entity/role.entity';

@EntityRepository(Role)
export class CustomRoleRepository extends Repository<Role> {}
