import { Field, InputType } from 'type-graphql';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

@InputType()
export class NewRoleInput {
  @Field(type => String)
  @IsNotEmpty({ message: 'name不能为空' })
  name: string;
}
