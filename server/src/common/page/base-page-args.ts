import { IsNotEmpty } from 'class-validator';
import { Field, ArgsType, Int } from 'type-graphql';

@ArgsType()
class BasePageArgs {
  @Field(type => Int)
  @IsNotEmpty()
  ps: number;

  @Field(type => Int)
  @IsNotEmpty()
  pn: number;
}

export default BasePageArgs;
