const JWT=require("jsonwebtoken")
const {TOKEN_EXPIRY,TOKEN_SECRET_KEY }=require("../../configs/config")


function AssignToken (user) {
return JWT.sign({
    id: user._id,
    name:user.name,
    email:user.email,
    role:user.role
},TOKEN_SECRET_KEY, {
    expiresIn:TOKEN_EXPIRY
})
}

module.exports={AssignToken}