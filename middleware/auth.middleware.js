const JWT=require("jsonwebtoken")
const { UnauthorizedError,BadRequestError,ForbiddenError}=require("../customErrors")
const {TOKEN_SECRET_KEY }=require("../configs/config")
const prisma=require("../configs/prisma.client.config")



const verifyToken=async(req,res,next)=>{
  try {
      const authHeader=req.headers['authorization'];
      
      if(!authHeader  || !authHeader.startsWith("Bearer ")){
          return next(new UnauthorizedError("Authorization token is missing or malformed"))
      }
      const token=authHeader.replace("Bearer ","")
      const  decoded=JWT.verify(token,TOKEN_SECRET_KEY)
      const user=await  prisma.user.findUnique({
          where:{id:decoded.id}
      })
      if(!user){
          throw new BadRequestError("user not found sorry ")
      }
      req.user=decoded
      next()
  } catch (error) {
    if(error instanceof JWT.JsonWebTokenError){
        return next(new UnauthorizedError("Invalid or expired token"))
    }
    next(error)
  }

}


const verifyAdmin=async(req,res,next)=>{
    if(!req.user || req.user.role !== "ADMIN"){
        return next( new ForbiddenError("You do not have permission to access this resource"))
    }
    next()
}

module.exports={verifyToken,verifyAdmin}