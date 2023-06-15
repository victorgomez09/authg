import { IApplicationScopes } from "./application.model";

export interface IUser {
    id: number;
    name: string;
    email: string;
    scopes: IApplicationScopes[]
    creationDate: Date
    updateDate: Date
}