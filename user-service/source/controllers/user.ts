import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { IUser } from "../db/mongo/user/IUser";
import { MongoManager } from "../db/mongo/MongoManager";
import { userValidatorSchema } from "../validators/userValidator";

export class User {
    private userModel: Model<IUser>;
    constructor() {
        this.userModel = MongoManager.getInstance().userModel;
    }

    public async create(user): Promise<IUser> {
        try {
            const {error, value} = userValidatorSchema.validate(user);
            if (error) throw error;
            value.email = value.email.toLowerCase();
            value.password = await bcrypt.hash(value.password, 10);
            const newUser = new this.userModel(value);
            return await newUser.save();
        } catch (e) {
            throw e;
        }
    }
}