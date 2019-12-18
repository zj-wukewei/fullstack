import { Field, ObjectType } from 'type-graphql';
import { Permission } from './permission';
import { BasePage } from '../../../common/page/base-page';

@ObjectType()
export class PermissionsPagination extends BasePage {
  @Field(() => [Permission])
  readonly list: Permission[] = [];
}
