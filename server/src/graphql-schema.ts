
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class LoginInput {
    usernameOrEmail: string;
    password: string;
}

export class RegisterInput {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class ResetPasswordInput {
    token: string;
    password: string;
}

export abstract class IQuery {
    abstract isUsernameFree(username: string): boolean | Promise<boolean>;

    abstract isEmailFree(email: string): boolean | Promise<boolean>;
}

export abstract class IMutation {
    abstract login(input: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract register(input: RegisterInput): RegisterResponse | Promise<RegisterResponse>;

    abstract sendEmailConfirmation(email: string): boolean | Promise<boolean>;

    abstract verifyEmail(token: string): ResponseForLogin | Promise<ResponseForLogin>;

    abstract sendResetPassword(email: string): boolean | Promise<boolean>;

    abstract resetPassword(input: ResetPasswordInput): ResponseForLogin | Promise<ResponseForLogin>;
}

export class LoginResponse {
    user: User;
    accessToken: string;
}

export class RegisterResponse {
    user: UserWithId;
}

export class ResponseForLogin {
    user: User;
    accessToken: string;
}

export class UserWithId {
    id: number;
}

export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}
