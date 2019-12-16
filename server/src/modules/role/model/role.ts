import { Field, ID, ObjectType } from 'type-graphql';
import { Permission } from '../../permission/model/permission';

@ObjectType()
export class Role {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Permission], { nullable: true })
  permissions?: Permission[];

  @Field(type => Date)
  createDate: Date;
}
