const prisma=require("../../configs/prisma.client.config")
const {BadRequestError }=require("../../customErrors")
const {okResponse }=require("../../utils/handler.utils")


const addToCart=async(req,res,next)=>{
    try{
    const {bookId}=req.params
    const userId=req.user?.id
    const existingBook=await prisma.order.findFirst({
        where:{
            userId:parseInt(userId),
            bookId:parseInt(bookId),
            status:"PENDING",
            
        }
    })

    if(existingBook){
       const bookDetails=await prisma.book.findUnique({
        where:{
            id:parseInt(bookId)
        }
       })
       if(!bookDetails){
        throw new BadRequestError("Book is not found !!")
       }

       const updateOrder=await prisma.order.update({
        where:{
            id:existingBook.id
        },
        data:{
            quantity:existingBook.quantity + 1,
            totalPrice:bookDetails.price * (existingBook.quantity + 1 )
        }

       })
       okResponse(res,200,"book is already exist in your cart ",updateOrder)
}

const Bookdetail=await prisma.book.findUnique({
    where:{
        id:parseInt(bookId)
    }
})

if(!Bookdetail){
    throw new BadRequestError("bookkkkk is not found :: sorryyy")
}

const createNewOrder=await prisma.order.create({
   
    data:{
        userId:parseInt(userId),
        bookId:parseInt(bookId),
        totalPrice:Bookdetail.price,
        quantity,

    }

})

    okResponse(res,200,"book add to cart successFully !!",createNewOrder)


}
catch(error){
    console.log("ERORROROR IN ADD TO CARTTT JAANI :: ",error)
    next(error)
}
}




module.exports={
    addToCart
}