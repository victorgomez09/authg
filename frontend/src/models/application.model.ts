import { IUser } from "./user.model";

export interface IApplication {
    id: number;
    name: string;
    description: string;
    type: "API" | "WEB";
    identifier: string;
    signingAlgorithm: "RS256" | "HS256";
    tokenExpiration: number;
    domain: string;
    clientId: string;
    clientSecret: string;
    users: IUser[]
    scopes: IApplicationScopes[]
}

export interface ICreateApplication {
    name: string;
    description: string;
    type: "API" | "WEB";
    identifier: string;
    signingAlgorithm: "RS256" | "HS256";
    tokenExpiration: number;
}

export interface IApplicationScopes {
    id: number;
    scope: string;
    description: string;
    application: IApplication;
}

export interface IAddApplicationScopes {
    id: number;
    scope: string;
    description: string;
}