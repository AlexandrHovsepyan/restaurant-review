"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidatorSchema = void 0;
const joi = require("joi");
const userValidatorSchema = joi.object({
    name: joi.string()
        .min(3)
        .max(255)
        .required(),
    email: joi.string()
        .required()
        .email({
        minDomainSegments: 2
    }),
    password: joi.string()
        .min(8)
        .max(30)
        .required()
});
exports.userValidatorSchema = userValidatorSchema;
