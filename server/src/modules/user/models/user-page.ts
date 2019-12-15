import { Field, ObjectType } from 'type-graphql';
import { User } from './user';
import { BasePage } from '../../../common/page/base-page';

@ObjectType()
export class UserPageInfo extends BasePage {
  @Field(type => [User])
  readonly list: User[];
}
