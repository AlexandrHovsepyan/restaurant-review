import * as joi from "joi";

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

export { restaurantValidatorSchema };