const {Router}=require("express")
const { verifyToken,verifyAdmin } = require("../middleware/auth.middleware")
const {addBook,deleteBook,updateBook }=require("../controllers/Admin/admin.controller")
const upload=require("../middleware/multer.middleware")
const adminRouter=Router()

adminRouter.post("/add-book",verifyToken,verifyAdmin,upload.single("imageFile"),addBook)
adminRouter.delete("/delete-book/:bookId",verifyToken,verifyAdmin,deleteBook)
adminRouter.patch("/update-book/:bookId",verifyToken,verifyAdmin,updateBook)

module.exports=adminRouter