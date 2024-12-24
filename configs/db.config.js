const prisma=require("./prisma.client.config")

const ConnectionDatabase=async()=>{
    try {
        await prisma.$connect()
        console.log("SUCCESSFULLY CONNECTION POSTGRES")
    } catch (error) {
        console.log("ERROR IN CONNECTON DATABASE ");
        process.exit(1)
    }
}


module.exports={ConnectionDatabase}




