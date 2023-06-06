import { API_BASE_URL } from "../constants";
import { ILoggedIn, ILogin, IRegister, IRegistered } from "../models/auth.model";
import { IUser } from "../models/user.model";
import { request } from "../utils/api.util";

export async function getCurrentUser() {
    return request<IUser>({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export async function login(loginRequest: ILogin): Promise<ILoggedIn> {
    return request<ILoggedIn>({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export async function register(registerRequest: IRegister): Promise<IRegistered> {
    return await request<IRegistered>({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(registerRequest)
    });
}