
const { BadRequestError}=require("../../customErrors") 
const prisma=require("../../configs/prisma.client.config")
const cloudinary=require("../../configs/cloudinary.config")
const { okResponse } = require("../../utils/handler.utils")
const {deleteCloudinaryImage }=require("../../utils/deleteImage.utils")
const HelperFunction=require("../../utils/helper/password.helper")


const updateInformationUser=async(req,res,next)=>{
    try {
        const {name}=req.body
        const userId=req.user?.id
        
        let changeInformationExistingUser= await prisma.user.findUnique({
            where:{
                id:parseInt(userId),
               
            },
            
        })
        
        if(!changeInformationExistingUser){
            throw new BadRequestError("user is not found please login again ")
        }
        const nameTaken=await prisma.user.findFirst({
            where:{
                name:name
            }
        })
        console.log("NAME TAKEN ERRRORRR :: ",nameTaken)
        
        if(nameTaken){
            throw new BadRequestError("name is already taken ")
        }
        const updateUser=await prisma.user.update({
            where:{
                id:parseInt(userId)
            },
            data:{
                name
            }
        })

        okResponse(res,200,"user information update successfully",updateUser)
    } catch (error) {
            console.log("ERROR IN CHANGE NAME :: ",error)
            next(error)
    }

}

const updateprofileImage=async(req,res,next)=>{
   try {
     const userId=req.user?.id
     let existingUser=await prisma.user.findUnique({
         where:{
             id:userId
         }
     })
 
     if(!existingUser){
         throw new BadRequestError("user not found please login again")
     }
     
     if(existingUser.profileImage !==null){
        await deleteCloudinaryImage(existingUser.profileImage)

     }
     let profileImage=null;
 
     if(req.file){
         const uploadImage=await new Promise((resolve,reject)=>{
             cloudinary.uploader.upload_stream((error,result)=>{
                 if(error) reject(error)
                     else resolve(result)
             }).end(req.file.buffer)
         })
         profileImage=uploadImage.secure_url
     }
 
     const updateUser=await prisma.user.update({
         where:{
             id:userId
         },
         data:{
             profileImage:profileImage
         }
     })
 
     okResponse(res,200,"user profile Upadted successfully",updateUser)
   } catch (error) {
    console.log("ERROR IN UPDATE PROFILE IMAGE :: ", error)
    next(error)
   }
}

const changePassword=async(req,res,next)=>{
   try {
     const {currentPassword,newPassword}=req.body;
     const userId=req.user?.id
     let user=await prisma.user.findUnique({
         where:{
             id:userId
         }
     })
     if(!user){
         throw new BadRequestError("user is not found sorry please login again")
     }
     const matchPassword=await HelperFunction.isPasswordCorrect(currentPassword,user.password)
     if(!matchPassword){
         throw new BadRequestError(" current password is incorrect")
     }
 
     const newHashPassword=await HelperFunction.Hashpassword(newPassword)
     const updateUser=await prisma.user.update({
         where:{
             id:userId
         },
         data:{
             password:newHashPassword || user.password
         }
     })
 
     okResponse(res,200,"password changed Successfully !!",updateUser)
   } catch (error) {
    console.log("ERROR IN CHANGE PASSWORD ",error);
    next(error)
    
   }
}

module.exports={
    updateInformationUser,
    updateprofileImage,
    changePassword
}