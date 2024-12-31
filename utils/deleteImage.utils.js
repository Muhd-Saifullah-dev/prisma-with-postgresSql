const cloudinary=require("../configs/cloudinary.config")
const {BadRequestError }=require("../customErrors")


const extractPublicIdFromImage=async(url)=>{
    const step1=url.split("/")
    const step2=step1.pop()
    const publicId=step2.split('.')[0]
    return publicId
}

const deleteCloudinaryImage=async(url)=>{
try {
     const publicId=await extractPublicIdFromImage(url)
     const result=await cloudinary.uploader.destroy(publicId)
     if(!result){
        throw new BadRequestError("image is not found")
     }
    return result
} catch (error) {
    console.log("error in delete Image",error)
}
}

module.exports={
    deleteCloudinaryImage
}