const path=require("path")
require("dotenv").config({
    path:path.resolve(__dirname,"../.env")
})

module.exports={
    PORT:process.env.PORT,
    DATABASE_URL:process.env.DATABASE_URL
}