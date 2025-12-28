const AuthSchema = require("../schema/auth.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");
const bcrypt = require("bcryptjs");
const emailSender = require("../utils/email-sender");
const {accessToken,refreshToken} = require("../utils/token-generator");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User already exists");
    }

    const hashPassword = await bcrypt.hash(password,12) 

    const randomNumbers = Array.from({length: 6}, () => Math.floor(Math.random()*10)).join("")

    const time = Date.now() + 120000
    
    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: randomNumbers,
      otpTime: time
    })

    await emailSender(randomNumbers,email)

    
    res.status(201).json({
      message: "Registered!"
    })      
    
    
    

  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
 const { email, otp } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }
   
    const time = Date.now()
    if(foundedUser.otpTime < time){
      throw CustomErrorHandler.BadRequest("Otp time expired")
    }

    if(foundedUser.otp !== otp){
      throw CustomErrorHandler.BadRequest("Wrong verification code")
    }
    

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {isVerified: true, otpTime: null, otp: null})


    const payload = {
      username: foundedUser.username,
      email: foundedUser.email,
      role: foundedUser.role,
      id: foundedUser._id
    }

    const access_token = accessToken(payload)
    const refresh_token = refreshToken(payload)


    res.cookie("access_token", access_token, {httpOnly: true, maxAge: 1000 * 60 * 15})
      res.cookie("refresh_token", refresh_token, {httpOnly: true, maxAge: 1000 * 60 * 15})

    res.status(200).json({
      message: "Success",
      access_token
    })

  } catch (error) {
    next(error);
  }
}


const login = async (req, res, next) => {
  try {

     const {email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    const compare = await bcrypt.compare(password, foundedUser.password)

    if(compare && foundedUser.isVerified){
     
       const payload = {
      username: foundedUser.username,
      email: foundedUser.email,
      role: foundedUser.role,
      id: foundedUser._id
    }

    const access_token = accessToken(payload)
    const refresh_token = refreshToken(payload)


    res.cookie("access_token", access_token, {httpOnly: true, maxAge: 1000 * 60 * 15})
      res.cookie("refresh_token", refresh_token, {httpOnly: true, maxAge: 1000 * 60 * 15})

    res.status(200).json({
      message: "Success",
      access_token
    })

    }else{
      throw CustomErrorHandler.UnAuthorized("Invalid password")
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
   res.clearCookie("access_token")
   res.clearCookie("refresh_token")
  } catch (error) {
    next(error);
  }
};


module.exports = {
  register,
  login,
  verify,
  logout
};
