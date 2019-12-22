import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class BasePage {
  @Field()
  readonly totalSize!: number;

  @Field()
  readonly hasMore!: boolean;
}
