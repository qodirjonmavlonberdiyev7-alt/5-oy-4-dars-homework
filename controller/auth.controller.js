const AuthSchema = require("../schema/auth.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");
const bcrypt = require("bcryptjs")


const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User already exists");
    }

    const hashPassword = await bcrypt.hash(password,12) 

    const randomNumbers = Array.from({length: 6}, () => Math.floor(Math.random()*10)).join("")


  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
