"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    stars: {
        type: mongoose_1.Schema.Types.Number
    },
    visitDate: {
        type: mongoose_1.Schema.Types.Number
    },
    comment: {
        type: mongoose_1.Schema.Types.String
    },
    restaurantId: {
        type: mongoose_1.Schema.Types.String,
        required: true
    }
}, { timestamps: true });
exports.reviewSchema = reviewSchema;
