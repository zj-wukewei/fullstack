import { IsNotEmpty } from 'class-validator';
import { Field, ArgsType, Int } from 'type-graphql';

@ArgsType()
export class BasePageArgs {
  @Field(type => Int)
  @IsNotEmpty()
  ps!: number;

  @Field(type => Int)
  @IsNotEmpty()
  pn!: number;
};
