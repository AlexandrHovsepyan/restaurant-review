"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantSchema = void 0;
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    photo: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        required: true
    }
}, { timestamps: true });
exports.restaurantSchema = restaurantSchema;
