import { IsNotEmpty } from 'class-validator';
import { Field, ArgsType } from 'type-graphql';

@ArgsType()
class BasePageArgs {
  @Field()
  @IsNotEmpty()
  ps: number;

  @Field()
  @IsNotEmpty()
  pn: number;
}

export default BasePageArgs;
