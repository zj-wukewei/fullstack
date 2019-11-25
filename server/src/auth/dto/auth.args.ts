import { IsMobilePhone } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class LoginArgs {
  @Field(type => String)
  @IsMobilePhone('zh-CN')
  phone: string;

  @Field(type => String)
  password: string;
}
