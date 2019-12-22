import { Field, InputType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class NewRoleInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'name不能为空' })
  name!: string;

  @Field(type => String, { nullable: true })
  describe?: string;
}
