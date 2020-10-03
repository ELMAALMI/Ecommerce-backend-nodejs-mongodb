const Joi = require('joi');


exports.ProductValidator = (data) =>
{
        const schema = Joi.object({
            name        : Joi.string().required().max(150),
            description : Joi.string().required().max(20000),
            price       : Joi.number().required(),
            category    : Joi.string().required(),
            quantity    : Joi.number(),
            shipping    : Joi.boolean()
        })
     
        const {error} = schema.validate(data);
        if(error)
        {
            return error;
        }
        return '';
}
exports.CategoryValidator = (data) =>
{
        const schema = Joi.object({
            name        : Joi.string().required().max(150),
        })
     
        const {error} = schema.validate(data);
        if(error)
        {
            return error;
        }
        return '';
}
