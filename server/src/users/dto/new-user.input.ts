import { Field, InputType } from 'type-graphql';
import { IsMobilePhone } from 'class-validator';

@InputType()
export class NewUserInput {
    @Field(type => String)
    @IsMobilePhone('zh-CN')
    phone: string
}