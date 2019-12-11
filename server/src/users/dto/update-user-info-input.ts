import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInfo {

  @Field(type => String)
  @IsNotEmpty({ message: '名字不能为空' })
  name: string;

  @Field(type => String)
  @IsNotEmpty({ message: '地址不能为空' })
  address: string;

  @Field(type => Int)
  @IsNotEmpty({ message: '年龄不能为空' })
  age: number;
}
