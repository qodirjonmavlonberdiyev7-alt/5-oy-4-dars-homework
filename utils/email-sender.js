const nodemailer = require("nodemailer")
const CustomErrorHandler = require("./custom-error-handler")


module.exports = async function(code, email){
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "qodirjonmavlonberdiyev7@gmail.com",
                pass: process.env.APP_KEY
            }
        })
    } catch (error) {
        throw CustomErrorHandler.BadRequest(error.message)
    }
}