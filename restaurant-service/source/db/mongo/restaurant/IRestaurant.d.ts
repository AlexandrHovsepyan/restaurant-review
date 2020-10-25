import { Document } from "mongoose";

export interface IRestaurantVo {
    id?: any,
    title: string,
    photo: string,
    description: string,
}

export interface IRestaurant extends IRestaurantVo, Document {

}