export interface ILogin {
    email: string;
    password: string;
}

export interface ILoggedIn {
    accessToken: string;
    tokenType: string
}

export interface IRegister {
    email: string;
    name: string;
    password: string;
}

export interface IRegistered {
    success: boolean;
    message: string;
}