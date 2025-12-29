const { Schema, model } = require("mongoose");

const Quote = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    added_by: {
        type: Schema.Types.ObjectId,
        ref: "Auth", 
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const QuoteSchema = model("Quote", Quote);
module.exports = QuoteSchema
