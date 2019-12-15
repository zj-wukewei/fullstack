import { Field, ID, ObjectType } from 'type-graphql';
import { UserInfo } from '../../user/models/user-info';

@ObjectType()
export class AuthUser {
  @Field(type => ID)
  id: number;

  @Field()
  phone: string;

  @Field(type => UserInfo, { nullable: true })
  info: UserInfo;

  @Field(type => String)
  roles: string[];

  @Field(type => String)
  permission: string[];
}
