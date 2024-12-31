const Joi = require("joi");
const {validationSchema,LoginvalidationSchema,usernameSchema,
    changePasswordSchema
} = require("../validations/validation.schema.js");
const { handleError } = require("../utils/handler.utils.js");

const signupvalidation = (req, res, next) => {
    try {
        
        const { error, value } = validationSchema.validate(req.body);
        if (error) {
            
            console.log("Validation error:", error.details);
            return handleError(res, 400, "Validation error", {data:error.details});
        }
         console.log("Valid data:", value);
        next();
    } catch (error) {
        console.log("Server error:", error);
        next(error); 
    }
};


const Loginvalidation = (req, res, next) => {
    try {
        
        const { error, value } = LoginvalidationSchema.validate(req.body);
        if (error) {
            
            console.log("Validation error:", error.details);
            return handleError(res, 400, "Validation error", {data:error.details});
        }
         console.log("Valid data:", value);
        next();
    } catch (error) {
        console.log("Server error:", error);
        next(error); 
    }
};


const changeusernameValidation=(req,res,next)=>{
    try {
        const {error,value}=usernameSchema.validate(req.body)
        if(error){
            console.log("Validation error:", error.details);
            return handleError(res, 400, "Validation error", {data:error.details});
        }
        console.log("Valid data:", value);
        next();
    } catch (error) {
        console.log("Server error:", error);
        next(error);
    }
}

const changePasswordValidation=async(req,res,next)=>{
    try {
        const {error,value}=changePasswordSchema.validate(req.body)
        if(error){
            console.log("Validation error:", error.details);
            return handleError(res, 400, "Validation error", {data:error.details});
        }
        console.log("Valid data:", value);
        next();
    } catch (error) {
        console.log("Server error:", error);
        next(error);
    }
}
module.exports = { signupvalidation,Loginvalidation,
    changePasswordValidation,
    changeusernameValidation
};
