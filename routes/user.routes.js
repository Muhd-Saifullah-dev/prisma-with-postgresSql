const {Router }=require("express")
const { Signup, loginUser } = require("../controllers/auth.controller")
const {signupvalidation, Loginvalidation }=require("../middleware/validation.middleware")
const userRouter=Router()

userRouter.post("/signup",signupvalidation,Signup)
userRouter.post("/login",Loginvalidation,loginUser)

module.exports=userRouter