import { Field, ID, ObjectType } from 'type-graphql';
import { UserInfo } from '../user/user-info';

@ObjectType()
export class AuthUser {
  @Field(type => ID)
  id!: number;

  @Field()
  phone!: string;

  @Field(type => UserInfo, { nullable: true })
  info?: UserInfo;

  @Field(type => String, { nullable: true })
  roles?: string[];

  @Field(type => String, { nullable: true })
  permission?: string[];
}
