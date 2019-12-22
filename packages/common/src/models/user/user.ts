import { Field, ID, ObjectType } from 'type-graphql';
import { UserInfo } from './user-info';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number;

  @Field()
  phone!: string;

  @Field(() => UserInfo, { nullable: true })
  info?: UserInfo;

  @Field(() => Date)
  createDate!: Date;
}
