import { IsMobilePhone } from 'class-validator';
import { ArgsType,InputType, Field } from 'type-graphql';

@InputType()
export class LoginArgs {
    @Field(type => String)
    @IsMobilePhone('zh-CN')
    phone: string

    @Field(type => String)
    password: string
}