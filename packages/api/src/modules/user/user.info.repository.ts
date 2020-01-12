import { EntityRepository, Repository } from 'typeorm';
import { UserInfo } from './entity/user-info.entity';

@EntityRepository(UserInfo)
export class CustomUserInfoRepository extends Repository<UserInfo> {}
