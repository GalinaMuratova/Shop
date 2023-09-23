export interface IUser {
    _id: string,
    username: string,
    password: string,
    token: string,
    displayName: string,
    phone: string
}

export interface RegisterMutation {
    username: string,
    password: string,
    displayName: string,
    phone: string
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}
export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}