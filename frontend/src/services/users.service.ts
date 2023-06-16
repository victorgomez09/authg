import { API_BASE_URL } from "../constants";
import { IApplicationScopes } from "../models/application.model";
import { IUser } from "../models/user.model";
import { request } from "../utils/api.util";

export async function getUsers(): Promise<IUser[]> {
    return request<IUser[]>({
        url: API_BASE_URL + "/api/v1/users/list",
        method: 'GET',
    });
}

export async function findUserById(id: number): Promise<IUser> {
    return request<IUser>({
        url: API_BASE_URL + "/api/v1/users/" + id,
        method: 'GET',
    });
}

export async function addUserScopes(id: number, scopes: IApplicationScopes[]): Promise<IUser> {
    return request<IUser>({
        url: API_BASE_URL + `/api/v1/users/${id}/scopes`,
        method: 'PUT',
        body: JSON.stringify(scopes)
    });
}