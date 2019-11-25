import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Auth {
    @Field(type => String)
    access_token: string;
}