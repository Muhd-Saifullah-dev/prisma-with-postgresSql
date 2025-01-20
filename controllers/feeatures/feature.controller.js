const prisma=require("../../configs/prisma.client.config")
const {BadRequestError }=require("../../customErrors")
const {okResponse }=require("../../utils/handler.utils")


const addToCart=async(req,res,next)=>{
   
    try{
        const {bookId }=req.params.id
        const userId=req.user?.id
        const existingBook=await prisma.book.findUnique({
            where:{
                id:parseInt(bookId)
            }
        })
        if(!existingBook){
            throw new BadRequestError("Book is not found ")
        }

        const existingOrder=await prisma.order.findFirst({
            where:{
                userId:parseInt(userId),
                bookId:parseInt(bookId),
                status:"PENDING"
            }
        })
        if(existingOrder){
            const Updateorder=await prisma.order.update({
                where:{
                    id:existingOrder.id
                },
                data:{
                    quantity:existingOrder.quantity + 1,
                    totalPrice:existingBook.price * (existingOrder.quantity + 1),
                    books:push(existingBook.id),
                }
            })
            okResponse(res,200,"BOOK QUANTITY INCREASES ",Updateorder)
        }


        const neworder=await prisma.order.create({
            data:{
                userId:parseInt(userId),
                bookId:parseInt(bookId),
                quantity:1,
                totalPrice:existingBook.price
            }
        })

        okResponse(res,200,"BOOK ADDED TO YOUR CART SUCCESSFULLY",neworder)
    }catch(error){
        console.log("ERROR IN ADD TO CART BOOK ",error)
        next(error)
    }
}


const incrementQuantity=async(req,res,next)=>{
    try {
        const {bookId}=req.params
        const userId=req.user?.id
        
        const existingBook=await prisma.book.findUnique({
            where:{
                id:parseInt(bookId)
            }
        })
        if(!existingBook){
            throw new BadRequestError("BOOK IS NOT FOUND SORRY ")
        }
        const existingOrder=await prisma.order.findFirst({
            where:{
                bookId:parseInt(bookId),
                userId:parseInt(userId),
                status:"PENDING"
            }
        })

        if(!existingOrder){
            throw new BadRequestError('THIS BOOK NOT IN YOUR CART ')
        }
            const updateOtder=await prisma.order.update({
                where:{id:existingOrder.id},
                data:{
                 quantity:existingOrder.quantity + 1,
                    totalPrice:existingBook.price * ( existingOrder.quantity + 1)
                }
            })
        okResponse(res,200,"QUANTITY INCREASE SUCCESSFULLY :: ",updateOtder)
    
    } catch (error) {
        console.log("ERROR IN INCREASE QUANTITY :: ",error)
        next(error)
    }
}


const decrementQuantity=async(req,res,next)=>{
   try {
     const {bookId}=req.params
     const userId=req.user?.id
     const existingBook=await prisma.book.findUnique({
         where:{
             id:parseInt(bookId)
         }
     })
     if(!existingBook){
         throw new BadRequestError("Book is not found")
 
     }
     const existingOrder=await prisma.order.findFirst({
         where:{
             bookId:parseInt(bookId),
             userId:parseInt(userId),
             status:"PENDING"
         }
     })
     if(!existingOrder){
         throw new BadRequestError("THIS BOOK IS NOT IN YOUR CART")
     }
     const updateOrder=await prisma.order.update({
         where:{
             id:existingOrder.id
         },
         data:{
             quantity:existingOrder.quantity - 1,
             totalPrice:existingBook.price * ( existingOrder.quantity - 1)
         }
     })
     okResponse(res,200,"DECREMENT THE QUANTITY ",updateOrder)
   } catch (error) {
    console.log("DECREMENT QUANTITY ERROR  :: ",error)
    next(error)
   }
}

const fetchAllBooks=async(req,res,next)=>{
    try {
        const fetchBooks=await prisma.book.findMany()
        if(fetchBooks.length===0){
            return okResponse(res,200,"fetch book successfully with 0 book",fetchBooks)
        }
        return okResponse(res,200,"fetching all books ",fetchBooks)
    } catch (error) {
        console.log("FETCHING ALL BOOKS ERROR :: ",error)
        next(error)
    }
}
module.exports={
    addToCart,
    decrementQuantity,
    incrementQuantity,
    fetchAllBooks
}