const prisma=require("../configs/prisma.client.config")
const {BadRequestError }=require("../customErrors")
const {okResponse }=require("../utils/handler.utils")
const Signup=async(req,res,next)=>{
    try {
        const { email,name,password}=req.body
        let user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(user){
         throw new BadRequestError("Email is already exist !! ") 
        }
        const newUser=await prisma.user.create({
            data:{
                email:email,
                name:name,
                password:password
            }
        })

       okResponse(res,201,"user created successfully ! ",{data:newUser})
    } catch (error) {
        console.log("errorr in signup",error)
        next(error)
    }
}

const loginUser=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        const user=await prisma.user.findFirst({
            where:{
                email:email
            }
        })
    } catch (error) {
        
    }
}
module.exports={
    Signup
}