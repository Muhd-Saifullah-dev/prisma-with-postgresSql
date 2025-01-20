const {Router}=require("express")
const {verifyToken }=require("../middleware/auth.middleware")
const { addToCart,incrementQuantity,decrementQuantity,fetchAllBooks } = require("../controllers/feeatures/feature.controller")
const featureRouter=Router()

featureRouter.post("/add-to-cart/:bookId",verifyToken,addToCart)
featureRouter.patch("/increment-quantity/:bookId",verifyToken,incrementQuantity)
featureRouter.patch("/decrement-quantity/:bookId",verifyToken,decrementQuantity)
featureRouter.get("/all-book",fetchAllBooks)

module.exports=featureRouter