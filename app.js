const reqResInspector=require("express-req-res-inspector")
const {globaleErrorMiddleware }=require("./middleware/globalError.middleware")

const express=require("express")
const app=express()


app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(reqResInspector())

app.get("/api/v1/health-check",(req,res,next)=>{
    return res.status(200).json({
        success:true,
        data:null,
        message:"Server is running"
    });
})

app.use(globaleErrorMiddleware)


module.exports=app