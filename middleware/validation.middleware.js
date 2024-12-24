
const { vine,errors}=require("@vinejs/vine")
const validationSchema=require("../validations/validation.schema.js")
const { handleError } = require("../utils/handler.utils.js")


const signupvalidation=async(req,res,next)=>{
    try {
        const validator = vine.compile(validationSchema)
        const output = await validator.validate(req.body)
        console.log("output ::: ",output)
        next()

    }
     catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.error("error",error.errors.messages)
         return  handleError(res,400,"validation error ",errors.messages)  
        
    }
    console.log("error in server ",error)
     }
    } 
    
