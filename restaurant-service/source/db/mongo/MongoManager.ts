import * as mongoose from "mongoose";
import { Connection, createConnection, Model } from "mongoose";
import { Config } from "../../config/Config";
import { ConfigSource } from "../../config/ConfigSource";
import { restaurantSchema } from "./restaurant/RestaurantSchema";
import { reviewSchema } from "./review/ReviewSchema";
import { IRestaurant } from "./restaurant/IRestaurant";
import { IReview } from "./review/IReview";
import  { IStartManager } from "../../utils/IStartManager";

export class MongoManager implements IStartManager {
    private static instance: MongoManager;
    private getConfig: (key: string) => any = Config.getInstance().configsFromSource(ConfigSource.MONGO);
    private mongoConnection: Connection;
    private _restaurantModel: Model<IRestaurant>;
    private _reviewModel: Model<IReview>;
    private connected: boolean = false;

    constructor(enforce: () => any) {
        if (enforce !== Enforce) {
            throw new Error("MongoManager is singletone");
        }
    }

    public get restaurantModel(): Model<IRestaurant> {
        return this._restaurantModel;
    }

    public get reviewModel(): Model<IReview> {
        return this._reviewModel;
    }

    public static getInstance(): MongoManager {
        if (MongoManager.instance == null) {
            MongoManager.instance = new MongoManager(Enforce);
        }

        return MongoManager.instance;
    }

    public async start(): Promise<void> {
        if (this.mongoConnection == null) {
            mongoose.set("useNewUrlParser", true);
            mongoose.set("useUnifiedTopology", true);
            mongoose.set("useCreateIndex", true);
            mongoose.set("useFindAndModify", true);

            this.mongoConnection = await createConnection(this.getConfig("mongo:dockerUri"));
            if (this.mongoConnection) {
                this._restaurantModel = this.mongoConnection.model<IRestaurant>("Restaurant", restaurantSchema);
                this._reviewModel = this.mongoConnection.model<IReview>("Review", reviewSchema);
                this.connected = true;
                console.log('MongoDB: connected');
            }
        } else {
            throw new Error("MongoManager: You can 'start' function only once");
        }
    }
}

function Enforce() {

}