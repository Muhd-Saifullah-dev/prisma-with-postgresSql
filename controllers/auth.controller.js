const prisma=require("../configs/prisma.client.config")


const Signup=async(req,res,next)=>{
    try {
        const { email,name,password}=req.body
        let user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(user){
            return res.status(400).json({success:false,message:"User is already exist"})
        }
        const newUser=await prisma.user.create({
            data:{
                email:email,
                name:name,
                password:password
            }
        })

        return res.status(201).json({success:true , message:"create user successfully" , data:newUser})
    } catch (error) {
        console.log("errorr in signup",error)
    }
}

module.exports={
    Signup
}