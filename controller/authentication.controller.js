

const User = require("../schema/authentication.schema.js");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
  try {
    const {full_name,email,password} = req.body;
    
    const exists = await User.findOne({email});
    if(exists){
      return res.status(400).json({message: "Email allaqachon mavjud!"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    
      await User.create({
        full_name,
        email,
        password: hashedPassword
      });
      
      res.status(201).json({message: "User registered"})
    } catch(error){
      res.status(500).json({
        message: error.message
      })
    }
  }
  



  const login = async (req,res) => {

     try {
       const {email,password} = req.body;
    
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message: "User not found"})
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(401).json({message: "Parol noto'g'ri"})
    } 

    res.status(200).json({message: "Login successful!"})
     } catch (error) {
      res.status(500).json({message: error.message})
     }
  }


  module.exports = {
    register,
    login
  }