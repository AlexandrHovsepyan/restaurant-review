import { Schema } from "mongoose";

const reviewSchema = new Schema({
    stars: {
        type: Schema.Types.Number
    },
    visitDate: {
        type: Schema.Types.Number
    },
    comment: {
        type: Schema.Types.String
    },
    restaurantId: {
        type: Schema.Types.String,
        required: true
    }
}, { timestamps: true });

export { reviewSchema };