const {Router }=require("express")
const { Signup } = require("../controllers/auth.controller")

const userRouter=Router()

userRouter.post("/signup",Signup)

module.exports=userRouter