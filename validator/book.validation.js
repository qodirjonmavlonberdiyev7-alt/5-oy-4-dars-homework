const Joi = require("joi")


exports.BookValidator = function(data){
    try{
        const schema = Joi.object({
            title: Joi.string().min(5).max(120).required(),
            pages: Joi.number().integer.min(10).max(900).required(),
            published_year: Joi.number().integer().max(new Date().getFullYear).min(1000).required(),
            image_url: Joi.string().min(15).required(),
            description: Joi.string().min(50).max(2000).required(),
            genre: Joi.string().valid("historical","drama","horror","romance","detective","documantry","science","fiction","fantasy","commedy","reality","animation","trialler","advanture","novel","poetry","satir","mella dramma","action").required(),
            period: Joi.string().valid("temuriylar davri", "jadid adabiyoti", "sovet davri", "mustaqillik davri").required(),
            published_home: Joi.string().min(4).required(),
            author_id: Joi.string().max(24).required()
        })


        return schema.validate(data)
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}