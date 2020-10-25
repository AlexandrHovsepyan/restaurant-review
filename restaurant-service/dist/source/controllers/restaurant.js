"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const MongoManager_1 = require("../db/mongo/MongoManager");
const restaurantValidator_1 = require("../validators/restaurantValidator");
class Restaurant {
    constructor() {
        this.restaurantModel = MongoManager_1.MongoManager.getInstance().restaurantModel;
    }
    create(restaurant) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = restaurantValidator_1.restaurantValidatorSchema.validate(restaurant);
                if (error)
                    throw error;
                const newRestaurant = new this.restaurantModel(value);
                return yield newRestaurant.save();
            }
            catch (e) {
                throw e;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.restaurantModel.find({});
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.Restaurant = Restaurant;
