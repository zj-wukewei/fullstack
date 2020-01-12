import { Field, InputType } from 'type-graphql';
import { IsMobilePhone } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field(type => String)
  @IsMobilePhone('zh-CN', { message: '手机格式不正确' })
  phone!: string;
}
