import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { Review } from "../controllers/review";

export class ReviewRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router
            .post("/", this.createReview)
    }
    public async createReview(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let reviewItem = new Review();
            let newReview = await reviewItem.create(req.body);
            if (newReview) {
                return res.status(201).json({
                    success: true,
                    newReview
                });
            }
            res.status(400).json({
                success: false
            });
        } catch (e) {
            next(e);
        }
    }
}