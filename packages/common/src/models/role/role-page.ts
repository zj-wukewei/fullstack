import { Field, ObjectType } from 'type-graphql';
import { Role } from './role';
import { BasePage } from '../page/base-page';

@ObjectType()
export class RolesPagination extends BasePage {
  @Field(() => [Role])
  readonly list: Role[] = [];
}
