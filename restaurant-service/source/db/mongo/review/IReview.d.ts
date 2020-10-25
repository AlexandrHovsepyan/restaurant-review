import { Document } from "mongoose";

export interface IReviewVo {
    id?: any,
    stars: number,
    visitDate: number,
    comment: string,
    restaurantId: string
}

export interface IReview extends IReviewVo, Document {

}