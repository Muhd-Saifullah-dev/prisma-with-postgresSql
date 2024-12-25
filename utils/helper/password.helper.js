const bcrypt=require("bcrypt")


function Hashpassword(userPassword){
    const salt=bcrypt.genSaltSync(10)
    const password=bcrypt.hashSync(userPassword,salt)
    return password

}


function isPasswordCorrect(password,userPassword){
    return bcrypt.compare(password,userPassword)
}

module.exports={Hashpassword,isPasswordCorrect}