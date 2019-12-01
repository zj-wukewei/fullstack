import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class UserPageInfo {
  @Field()
  totalSize: number;

  @Field(type => [User])
  list: User[];

  public static createPageInfo(totalSize: number, list: User[]): UserPageInfo {
    const pageInfo = new UserPageInfo();
    pageInfo.totalSize = totalSize;
    pageInfo.list = list;
    return pageInfo;
  }
}
