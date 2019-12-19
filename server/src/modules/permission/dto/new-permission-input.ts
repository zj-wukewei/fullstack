import { Field, InputType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class NewPermissionInput {
  @Field(type => String)
  @IsNotEmpty({ message: 'name不能为空' })
  name: string;

  @Field(type => String)
  alias: string;

  @Field(type => String)
  group: string;
}
