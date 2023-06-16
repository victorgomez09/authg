import { IApplicationScopes } from "./application.model";

export interface IUser {
    id: number;
    name: string;
    email: string;
    applicationScopes: IApplicationScopes[]
    creationDate: Date
    updateDate: Date
}