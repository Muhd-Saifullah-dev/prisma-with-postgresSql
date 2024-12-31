const prisma = require("../../configs/prisma.client.config");
const { BadRequestError, ValidationError } = require("../../customErrors");
const cloudinary=require("../../configs/cloudinary.config");
const { okResponse } = require("../../utils/handler.utils");

const addBook=async(req,res,next)=>{
 try {
    const {title,price,description,stock}=req.body;
    let exitingBook=await prisma.book.findUnique({
       where:{
           title,
       }
    })
    if(exitingBook){
       throw new BadRequestError("book with this title is already exist")
    }
   
       if(!req.file){
           throw new ValidationError("Image is required then we will further procceed")
       }
   
       let uploadImage=await new Promise((resolve,reject)=>{
           cloudinary.upload.uploader_stream({folder:"BookImages"},(error,result)=>{
               if(error) reject(error)
                   else resolve(result)
           }).end(req.file.buffer)
       })
    const newBook=await prisma.book.create({
       title,
       price: new prisma.decimal(price),
       stock,
       description,
       bookImage:uploadImage.secure_url
    })
    okResponse(res,201,"new Book added Successfully!!",newBook)
 } catch (error) {
    console.log("ERROR IN ADDING BOOK API",error)
    next(error)
 }
}

const updateBook=async(req,res,next)=>{
 try {
       const {title,description,stock}=req.body;
       const bookId=req.params.id
   
       let exitingBook=await prisma.book.findUnique({
           where:{
               id:parseInt(bookId)
           }
       })
       if(!exitingBook){
           throw new BadRequestError("Book is not found please try again later")
       }
   
       let UpdatedBook=await prisma.book.update({
           where:{
               id:parseInt(bookId)
           },
           data:{
               title:title || exitingBook.title,
               description:description || exitingBook.description,
               stock:stock !==undefined ? stock : exitingBook.stock
   
           }
       })
   
       okResponse(res,200,"book information updated successfully !!",UpdatedBook)
 } catch (error) {
    console.log("ERROR IN UPDATED BOOK API",error)
    next(error)
 }


}


const deleteBook=async(req,res,next)=>{
    try {
        const {bookId}=req.params.id
        const deleteThisBook=await prisma.book.delete({
            where:{
                id:bookId
            }
        })
        if(!deleteThisBook){
            throw new BadRequestError("book not found please try again later")
        }
        okResponse(res,200,"Book delete Successfully",deleteThisBook)
    } catch (error) {
        console.log("ERROR IN DELETE BOOK",error)
        next(error)
    }
}



module.exports={
    updateBook,
    addBook,
    deleteBook
}