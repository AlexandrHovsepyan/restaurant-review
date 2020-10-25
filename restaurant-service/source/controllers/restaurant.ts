import { Model } from "mongoose";
import { MongoManager } from "../db/mongo/MongoManager";
import { restaurantValidatorSchema } from "../validators/restaurantValidator";
import {IRestaurant, IRestaurantVo} from "../db/mongo/restaurant/IRestaurant";

export class Restaurant {
    private restaurantModel: Model<IRestaurant>;
    constructor() {
        this.restaurantModel = MongoManager.getInstance().restaurantModel;
    }

    public async create(restaurant: IRestaurantVo): Promise<IRestaurant> {
        try {
            const {error, value} = restaurantValidatorSchema.validate(restaurant);
            if (error) throw error;
            const newRestaurant = new this.restaurantModel(value);
            return await newRestaurant.save();
        } catch (e) {
            throw e;
        }
    }
    public async getAll(): Promise<IRestaurant[]> {
        try {
            return await this.restaurantModel.find({});
        } catch (e) {
            throw e;
        }
    }
}