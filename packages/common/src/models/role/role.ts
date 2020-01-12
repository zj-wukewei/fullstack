import { Field, ID, ObjectType } from 'type-graphql';
import { Permission } from '../permission/permission';

@ObjectType()
export class Role {
  @Field(type => ID)
  id!: number;

  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  describe?: string;

  @Field(() => [Permission], { nullable: true })
  permissions?: Permission[];

  @Field(() => Date)
  createDate!: Date;
}
