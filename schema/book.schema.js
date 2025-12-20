const { Schema, model } = require("mongoose");



const Book = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    pages: {
        type: Number,
        required:true
    },
    death_year: {
        type: String,
        required: false,
        default: null
    },
    image_url : {
        type: String,
        required: true
    },
    bio : {
        type: String,
        required: true
    },
    genre : {
        type: String,
        required: true
    },
    period : {
        type: String,
        required: true
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