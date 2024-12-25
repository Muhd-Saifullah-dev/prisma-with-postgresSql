const path=require("path")
require("dotenv").config({
    path:path.resolve(__dirname,"../.env")
})

module.exports={
    PORT:process.env.PORT,
    TOKEN_SECRET_KEY:process.env.TOKEN_SECRET_KEY,
    TOKEN_EXPIRY:process.env.TOKEN_EXPIRY,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUD_API:process.env.CLOUD_API,
    CLOUD_SECRET:process.env.CLOUD_SECRET
}