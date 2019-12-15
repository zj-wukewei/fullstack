import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserInfo {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  age: number;

  @Field(type => Date)
  createDate: Date;
}
