import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class CustomUserRepository extends Repository<User> {
  findOneByPhone(phone: string) {
    return this.findOne({ phone }, { relations: ['info', 'roles'] });
  }
}
