import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
    @Field(type => ID)
    id: string;

    @Field(type => String)
    phone: string;

    @Field(type => Date)
    createDate: Date;
}