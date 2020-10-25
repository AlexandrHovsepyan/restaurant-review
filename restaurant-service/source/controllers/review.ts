import { Model } from "mongoose";
import { MongoManager } from "../db/mongo/MongoManager";
import { IReview, IReviewVo } from "../db/mongo/review/IReview";

export class Review {
    private reviewModel: Model<IReview>;
    constructor() {
        this.reviewModel = MongoManager.getInstance().reviewModel;
    }

    public async create(review: IReviewVo): Promise<IReview> {
        try {
            const newReview = new this.reviewModel(review);
            return await newReview.save();
        } catch (e) {
            throw e;
        }
    }
}