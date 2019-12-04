import { Field, ObjectType } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class UserPageInfo {
  @Field()
  totalSize: number;

  @Field()
  hasMore: boolean;

  @Field(type => [User])
  list: User[];

}
