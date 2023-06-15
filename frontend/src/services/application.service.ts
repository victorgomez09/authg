import { API_BASE_URL } from "../constants";
import { IAddApplicationScopes, IApplication, IApplicationScopes, ICreateApplication } from "../models/application.model";
import { request } from "../utils/api.util";

export async function findAppsByUser(userEmail = "") {
    return await request<IApplication[]>({
        url: API_BASE_URL + `/api/v1/application/user?email=${userEmail}`,
        method: 'GET',
    });
}

export async function findAppsByType(type = "api") {
    return await request<IApplication[]>({
        url: API_BASE_URL + `/api/v1/application/type?type=${type}`,
        method: 'GET',
    });
}

export async function findAppById(id = "") {
    return await request<IApplication>({
        url: API_BASE_URL + `/api/v1/application/${id}`,
        method: 'GET',
    });
}


export async function createApp(applicationData: ICreateApplication): Promise<IApplication> {
    return await request<IApplication>({
        url: API_BASE_URL + "/api/v1/application",
        method: 'POST',
        body: JSON.stringify(applicationData)
    });
}

export async function addScopes(scopesData: IAddApplicationScopes): Promise<IApplicationScopes[]> {
    return await request<IApplicationScopes[]>({
        url: API_BASE_URL + "/api/v1/application/" + scopesData.id,
        method: 'PUT',
        body: JSON.stringify(scopesData)
    });
}