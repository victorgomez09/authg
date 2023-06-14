import { IApplication } from "./application.model";

export interface IUser {
    name: string;
    email: string;
    applications: IApplication[]

}