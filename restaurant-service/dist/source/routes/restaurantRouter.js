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
exports.RestaurantRouter = void 0;
const express = require("express");
const restaurant_1 = require("../controllers/restaurant");
const reviewRouter_1 = require("./reviewRouter");
const authorize_1 = require("../utils/authorize");
class RestaurantRouter {
    constructor() {
        this.router = express.Router();
        this.router.route("/")
            .post(authorize_1.authorize(), this.createRestaurant)
            .get(this.getRestaurants);
        this.router
            .use("/:id/review", new reviewRouter_1.ReviewRouter().router);
    }
    createRestaurant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let restaurantItem = new restaurant_1.Restaurant();
                let newRestaurant = yield restaurantItem.create(req.body);
                if (newRestaurant) {
                    return res.status(201).json({
                        success: true,
                        newRestaurant
                    });
                }
                res.status(400).json({
                    success: false
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    getRestaurants(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let restaurantItem = new restaurant_1.Restaurant();
                let restaurants = yield restaurantItem.getAll();
                if (restaurants) {
                    return res.status(200).json({
                        success: true,
                        restaurants
                    });
                }
                res.status(400).json({
                    success: false
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.RestaurantRouter = RestaurantRouter;
