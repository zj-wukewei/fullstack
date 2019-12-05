import { Field, ID, ObjectType } from 'type-graphql';
import { UserInfo } from '../../users/models/user-info';

@ObjectType()
export class AuthUser {
  @Field(type => ID)
  id: number;

  @Field()
  phone: string;

  @Field(type => UserInfo, { nullable: true })
  info: UserInfo;

  @Field(type => String)
  roles: String[]

  @Field(type => String)
  permission: String[]

  @Field(type => Date)
  createDate: Date;
}
