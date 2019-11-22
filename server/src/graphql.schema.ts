
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateUserInput {
    phone?: string;
}

export class LoginArgs {
    phone?: string;
    password?: string;
}

export class LoginResult {
    access_token?: string;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;

    abstract login(user?: LoginArgs): LoginResult | Promise<LoginResult>;
}

export abstract class ISubscription {
    abstract userCreated(): User | Promise<User>;
}

export class User {
    id?: number;
    phone?: string;
}
