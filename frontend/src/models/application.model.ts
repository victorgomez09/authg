export interface IApplication {
    id: string;
    name: string;
    description: string;
    type: "API" | "WEB";
    identifier: string;
    signingAlgorithm: "RS256" | "HS256";
    tokenExpiration: number;
    domain: string;
    clientId: string;
    clientSecret: string;
}

export interface ICreateApplication {
    name: string;
    description: string;
    type: "API" | "WEB";
    identifier: string;
    signingAlgorithm: "RS256" | "HS256";
    tokenExpiration: number;
}