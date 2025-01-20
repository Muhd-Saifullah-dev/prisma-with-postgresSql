const { Router}=require("express")
const userRouter = require("./user.routes")
const adminRouter=require("./admin.routes")
const rootRouter=Router()

rootRouter.use("/user",userRouter)
rootRouter.use('/admin',adminRouter)


module.exports=rootRouter