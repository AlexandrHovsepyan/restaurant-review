import { Schema } from "mongoose";

const restaurantSchema = new Schema({
   title: {
       type: Schema.Types.String,
       required: true
   },
   photo: {
       type: Schema.Types.String,
       required: true
   },
   description: {
       type: Schema.Types.String,
       required: true
   }
}, { timestamps: true });

export { restaurantSchema };