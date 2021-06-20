export class CreateUserRequest {
    email: string;
    password: string;
}

export class CreateUserResponse {
    id: number;
    email: string;
    roleId: number;
    createdOn: string;
}

export class AuthenticateUserRequest {
    email: string;
    password: string;
}