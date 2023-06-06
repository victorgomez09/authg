import { API_BASE_URL } from "../constants";
import { IApplication, ICreateApplication } from "../models/application.model";
import { request } from "../utils/api.util";

export async function findAppsByUser(userEmail = "") {
    return await request<IApplication[]>({
        url: API_BASE_URL + `/api/v1/application/user?email=${userEmail}`,
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