/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateUserInput {
  name?: string;
  age?: number;
}

export abstract class IMutation {
  abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;
}

export abstract class IQuery {
  abstract getUsers(): User[] | Promise<User[]>;

  abstract user(id: string): User | Promise<User>;
}

export abstract class ISubscription {
  abstract userCreated(): User | Promise<User>;
}

export class User {
  id?: number;
  name?: string;
  age?: number;
}
