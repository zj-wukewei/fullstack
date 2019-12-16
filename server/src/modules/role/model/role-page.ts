import { Field, ObjectType } from 'type-graphql';
import { Role } from './role';
import { BasePage } from '../../../common/page/base-page';

@ObjectType()
export class RolePageInfo extends BasePage {
  @Field(() => [Role])
  readonly list: Role[] = [];
}
