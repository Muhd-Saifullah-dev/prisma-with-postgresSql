const {Router }=require("express")
const { Signup, loginUser } = require("../controllers/Auth/auth.controller")
const {signupvalidation, Loginvalidation }=require("../middleware/validation.middleware")
const profileRouter=require("./profile.routes")
const featureRouter=require("./feature.routes")
const userRouter=Router()

userRouter.post("/signup",signupvalidation,Signup)
userRouter.post("/login",Loginvalidation,loginUser)

userRouter.use("/profile",profileRouter)
userRouter.use("feature",featureRouter)
module.exports=userRouter