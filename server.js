const app=require("./app")
const {PORT }=require("./configs/config")

const port=PORT || 3000


app.listen(port,()=>{
    console.log(`server is running at PORT : ${port}`)
})


