const {  vine } = require("@vinejs/vine")



 const validationSchema=vine.object({
            name:vine.string({message:"name is required"}).minLength(4,{message:"name is length at least 4 character "}).maxLength(120,{
                message:"maximum length is 120 character "
            }),
            email:vine.string({message:"email is required"}).email({message:"this is not email"}).minLength(8,{message:"email at least 8 character"}),
            password:vine.string({message:"password is required"}).minLength(8,{message:"password must be at leasat 8 character"})
            
        })
   
        module.exports=validationSchema
 