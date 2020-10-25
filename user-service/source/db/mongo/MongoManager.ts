import * as mongoose from "mongoose";
import { Connection, createConnection, Model } from "mongoose";
import { Config } from "../../config/Config";
import { ConfigSource } from "../../config/ConfigSource";
import { userSchema } from "./user/UserSchema";
import { IUser } from "./user/IUser";
import  { IStartManager } from "../../utils/IStartManager";

export class MongoManager implements IStartManager {
    private static instance: MongoManager;
    private getConfig: (key: string) => any = Config.getInstance().configsFromSource(ConfigSource.MONGO);
    private mongoConnection: Connection;
    private _userModel: Model<IUser>;
    private connected: boolean = false;

    constructor(enforce: () => any) {
        if (enforce !== Enforce) {
            throw new Error("MongoManager is singletone");
        }
    }

    public get userModel(): Model<IUser> {
        return this._userModel;
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
                this._userModel = this.mongoConnection.model<IUser>("User", userSchema);
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