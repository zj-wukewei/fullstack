import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field()
  phone: string;

  @Field(type => Date)
  createDate: Date;
}
