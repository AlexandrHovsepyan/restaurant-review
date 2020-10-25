"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantValidatorSchema = void 0;
const joi = require("joi");
const restaurantValidatorSchema = joi.object({
    title: joi.string()
        .required(),
    photo: joi.string()
        .required(),
    description: joi.string()
        .min(3)
        .max(300)
        .required()
});
exports.restaurantValidatorSchema = restaurantValidatorSchema;
