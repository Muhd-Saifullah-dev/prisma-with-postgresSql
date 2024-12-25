const Joi = require('joi');



 const validationSchema=Joi.object({
            name:Joi.string().required().min(4).max(120)
            .messages({
                "string.base":"Name must be string",
                'string.empty':"Name cannot be empty",
                "string.min":"Name must be at least 4 character",
                "string.max":"Name maximum length is 120 character",
                "any.required":"Name is required"
            }),
            email:Joi.string().required().email().min(6)
            .messages({
                "string.base":"email must be string",
                "string.empty":"email cannot be empty",
                "string.min":"email must be at least 6 character",
                "string.email":"email must be a valid email address ",
                "any.required":"email is required"
            }),
            password:Joi.string().required().min(8)
            .messages({
                'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should have a minimum length of 8 characters',
        'any.required': 'Password is required',
            })
            
        })
        
        const LoginvalidationSchema=Joi.object({
            email:Joi.string().required().email()
            .messages({
                "any.required":"email is required",
                "string.email":"email must be a valid email address",

            }),
            password:Joi.string().required()
            .messages({
                "any.required":"password is required"
            })
        })


        module.exports={validationSchema,LoginvalidationSchema}
 