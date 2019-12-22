import { Field, ObjectType } from 'type-graphql';
import { User } from './user';
import { BasePage } from '../page/base-page';

@ObjectType()
export class UsersPagination extends BasePage {
  @Field(() => [User])
  readonly list: User[] = [];
}
