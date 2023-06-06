export interface IApplication {
    id: string;
    name: string;
    description: string;
    type: "API" | "WEB";
    identifier: string;
    signingAlgorithm: "RS256" | "HS256";
    tokenExpiration: number;
}

export interface ICreateApplication {
    name: string;
    description: string;
    type: "API" | "WEB";
    identifier: string;
    signingAlgorithm: "RS256" | "HS256";
    tokenExpiration: number;
}