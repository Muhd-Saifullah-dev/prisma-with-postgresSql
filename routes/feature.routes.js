const {Router}=require("express")
const {verifyToken }=require("../middleware/auth.middleware")
const { addToCart } = require("../controllers/feeatures/feature.controller")
const featureRouter=Router()

featureRouter.post("/add-to-cart/:bookId",verifyToken,addToCart)

module.exports=featureRouter