const app=require("./app")
const {PORT }=require("./configs/config")
const {ConnectionDatabase }=require("./configs/db.config")
const port=PORT || 3000



ConnectionDatabase().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at PORT : ${port}`)
    })
})
.catch(()=>{
    console.log("ERROR IN CATCH CONNECTION POSTGRES :: ")
})


