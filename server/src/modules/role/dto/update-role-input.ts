import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateRoleInput {
  @Field(type => String)
  @IsNotEmpty({ message: 'name不能为空' })
  name: string;


  @Field(type => String, { nullable: true })
  describe?: string;

  @Field(() => [Int], { nullable: true })
  permissionIds?: number[];
}
