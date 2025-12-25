const { Schema, model } = require("mongoose");



const Book = new Schema({
    title: {
        type: String,
        required: true,
        unique: [true, "Kitob nomi kiritilishi shart"],
        set: value => value.trim(),
        minLength: [5, "Kitobning nomi kamida 5 ta harfdan iborat bo'lishi kerak"],
        maxLength: [120, "Kitobning nomi 120 ta harfdan oshmasligi kerak"]
    },
    pages: {
        type: Number,
        required:[true, "Sahifalar sonini kiriting"],
        min: [10,"Kitob kamida 10 varoqdan iborat bo'lishi kerak"],
        max: [900, "Kitobning varoqlar soni 900 dan oshmasligi kerak"]
    },
    published_year: {
        type: String,
        required: false,
        default: null,
        max: [new Date().getFullYear(), "Kiritilgan yil shu yildan katta bo'lmasligi lozim"],
        min: 1000

    },
    image_url : {
        type: String,
        required: true,
        minLength: [15, "URL kamida 15 ta belgidan iborat bo'lishi lozim"],
        match: [/^[a-zA-Z0-9@:;//.?-_]+$/]
    },
    description : {
        type: String,
        required: true,
        minLength: 50,
        maxLength: [2000, "Ta'rif 2000 ta harfdan oshmasligi kerak"],
        trim: true
    },
    genre : {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values : [ "historical","drama","horror","romance","detective",
        "documentary","science","fiction","fantasy","comedy","roman",
        "reality","animation","thriller","adventure","novel",
        "poetry","satire","melodrama","action"],
        message: `{VALUE} bunday janr mavjud emas`
        }

    },
    period : {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["temuriylar davri",
        "jadid adabiyoti",
        "sovet davri",
        "mustaqillik davri","Uyg‘onish (Renessans)","Ma’rifatparvarlik","Realizm"],
        message: `{VALUE} bunday davr mavjud emas`
        }
    },
    published_home: {
        type: String,
        required: true,
        trim: true,
        minLength: [4, "Nashriyot uyi nomi juda qisqa"]
    },
    author_id : {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
})

const BookSchema = model("Book", Book)


module.exports = BookSchema