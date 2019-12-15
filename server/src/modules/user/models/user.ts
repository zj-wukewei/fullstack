import { Field, ID, ObjectType } from 'type-graphql';
import { UserInfo } from './user-info';

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field()
  phone: string;

  @Field(type => UserInfo, { nullable: true })
  info: UserInfo;

  @Field(type => Date)
  createDate: Date;
}
