const prisma=require("../../configs/prisma.client.config")
const {BadRequestError }=require("../../customErrors")
const {okResponse }=require("../../utils/handler.utils")
const cloudinary=require("../../configs/cloudinary.config")
const HelperFunction=require("../../utils/helper/index")

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
        let profileImageUrl=null;
        if(req.file){
            const uploadImage=await new Promise((resolve,reject)=>{
                cloudinary.uploader
                .upload_stream({folder:"bookStore"},(error,result)=>{
                    if(error) reject(error)
                    else resolve(result)
                })
                .end(req.file.buffer)
            })
           profileImageUrl= uploadImage.secure_url
        }
        

        const HashPassword=await HelperFunction.Hashpassword(password)

        const newUser=await prisma.user.create({
            data:{
                email:email,
                name:name,
                password:HashPassword,
                profileImage:profileImageUrl
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
        let user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(!user){
            throw new BadRequestError("this email is not exist")
    }
    const MatchPassword=await HelperFunction.isPasswordCorrect(password,user.password)


    if(!MatchPassword){
        throw new BadRequestError("Invalid credientials")
    }

    const accessToken=await HelperFunction.AssignToken(user)
    okResponse(res,200,"user login Successfully",user,accessToken)
    } catch (error) {
        console.log("ERROR IN LOGIN ",error)
        next(error)
    }
}

const updateInformationUser=async(req,res,next)=>{
    const {name}=req.body
    const userId=req.user?.id
    let changeInformationExistingUser= await prisma.user.findUnique({
        where:{
            id:parseInt(userId)
        },
        data:{
            name:name
        }
    })

    if(!changeInformationExistingUser){
        throw new BadRequestError("user is not found please login again ")
    }
    okResponse(res,200,"user information update successfully",changeInformationExistingUser)

}
module.exports={
    Signup,
    loginUser,
    updateInformationUser
}