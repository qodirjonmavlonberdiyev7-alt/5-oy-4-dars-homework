
const {Router} = require("express")
const { register, login } = require("../controller/authentication.controller")

const  authenticationRouter = Router()

authenticationRouter.post("/register", register)
authenticationRouter.post("/login", login)


module.exports = authenticationRouter