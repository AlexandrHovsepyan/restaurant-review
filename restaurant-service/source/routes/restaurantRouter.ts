import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { Restaurant } from "../controllers/restaurant";
import { ReviewRouter } from "./reviewRouter";
import { authorize } from "../utils/authorize";

export class RestaurantRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.route("/")
            .post(authorize(), this.createRestaurant)
            .get(this.getRestaurants);
        this.router
            .use("/:id/review", new ReviewRouter().router)
    }
    public async createRestaurant(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let restaurantItem = new Restaurant();
            let newRestaurant = await restaurantItem.create(req.body);
            if (newRestaurant) {
                return res.status(201).json({
                    success: true,
                    newRestaurant
                });
            }
            res.status(400).json({
                success: false
            });
        } catch (e) {
            next(e);
        }
    }

    public async getRestaurants(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let restaurantItem = new Restaurant();
            let restaurants = await restaurantItem.getAll();
            if (restaurants) {
                return res.status(200).json({
                    success: true,
                    restaurants
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