 

 const Joi = require("joi")
 
 
 exports.AuthValidator = function(data){
     
         const schema = Joi.object({
             username: Joi.string().min(3).max(30).trim().pattern(/^[a-zA-Z0-9' ]+$/).required(),
             email: Joi.string().min(10).trim().required(),
             password: Joi.string().min(8).trim().required(),
             role: Joi.string().lowercase().valid("superadmin", "admin", "user").default("user").optional()
         });
 
 
         return schema.validate(data,  { abortEarly: false })
    
 }