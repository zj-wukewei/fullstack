import { IsMobilePhone, IsNotEmpty } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class LoginArgs {
  @Field(type => String)
  @IsMobilePhone('zh-CN', { message: '手机格式不正确' })
  phone!: string;

  @Field(type => String)
  @IsNotEmpty({ message: '密码不能为空' })
  password!: string;
}
