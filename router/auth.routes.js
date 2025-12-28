const {Router} = require("express")
const { register, verify, login, logout } = require("../controller/auth.controller")
const refreshToken = require("../middleware/refresh-token")

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/verify",verify)
authRouter.post("/login",login)
authRouter.get("/refresh",refreshToken)
authRouter.get("/logout",logout)


module.exports = authRouter

