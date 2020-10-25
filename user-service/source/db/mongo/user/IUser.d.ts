import { Document } from "mongoose";

export interface IUserVo {
    id?: any,
    name: string,
    email: string,
    password: string,
    createdAt?: string,
    updatedAt?: string
}

export interface IUser extends IUserVo, Document {

}