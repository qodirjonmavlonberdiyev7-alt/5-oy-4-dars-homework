const { Schema, model } = require("mongoose");



const Author = new Schema({
    full_name: {
        type: String,
        required: [true, "full_name kiritilishi shart"],
        unique: false,
        set: value => value.trim().toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        minLength: [5, "Kamida 5 ta harfdan iborat bo'lishi kerak"],
        match: [/^[a-zA-Z] +$/, "faqat raqam kiriting"],
    },
    birth_year: {
        type: Number,
        required:true,
        max: [new Date().getFullYear() - 25, "Adib kamida 26 yosh bo'lishi kerak"],
        min: 0
    },
    death_year: {
        type: String,
        required: false,
        default: null,
        max: new Date().getFullYear()
    },
    image_url : {
        type: String,
        required: true,
        minLength: [15, "url kamida 15 ta belgidan iborat bo'lishi kerak"]
    },
    bio : {
        type: String,
        required: true,
        maxLength: 10000,
        trim: true
    },
    genre : {
        type: String,
        required: true,
        toLowerCase: true,
        enum : {
            values : ["historical","drama","horror","romance","detective","documantry","science","fiction","fantasy","commedy","reality","animation","trialler","advanture","novel","poetry","satir","mella dramma","action"]
        },
        message: `{VALUE} bunday qiymat qabul qilinmaydi`
    },
    period : {
        type: String,
        required: true,
        set: value => value.toLowerCase(),
        enum: {
            values : ["temuriylar davri", "jadid adabiyoti", "sovet davri", "mustaqillik davri"],
            message: `{VALUE} bunday qiymat qabul qilinmaydi`
        }
    },
    creativity: {
        type: String,
        required: true
    },
    region : {
        type : String,
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
})

const AuthorSchema = model("Author", Author)


module.exports = AuthorSchema