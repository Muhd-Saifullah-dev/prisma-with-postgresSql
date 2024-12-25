const multer=require("multer")

const storage=multer.memoryStorage()

const fileFilter=(req,file,cb)=>{
    const allowedType=["image/png","image/jpeg","image/jpg"]
    if(allowedType.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(new Error("only .png .jpeg .jpg format are allowed"),false)

    }
    }

    const upload=multer({
        storage:storage,
        fileFilter:fileFilter,
        limits:{fileSize:5 * 1024 * 1024}
    })

    module.exports=upload