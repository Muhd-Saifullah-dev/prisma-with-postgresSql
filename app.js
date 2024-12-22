const reqResInspector=require("express-req-res-inspector")


const express=require("express")
const app=express()


app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(reqResInspector())



module.exports=app