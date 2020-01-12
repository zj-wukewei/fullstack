import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Permission {
  @Field(type => ID)
  id!: number;

  @Field()
  alias!: string;

  @Field()
  name!: string;

  @Field()
  group!: string;

  @Field(() => Date)
  createDate!: Date;
}
