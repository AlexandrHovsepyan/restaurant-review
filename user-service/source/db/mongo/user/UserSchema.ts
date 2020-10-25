import { Schema } from "mongoose";

const userSchema = new Schema({
   name: {
       type: Schema.Types.String,
       required: true
   },
   email: {
       type: Schema.Types.String,
       required: true,
       unique: true
   },
   password: {
       type: Schema.Types.String,
       required: true
   }
}, { timestamps: true });

export { userSchema };