
const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        trim: true,
        minLength: [5, "full_name kamida 5 ta harfdan iborat bo'lishi kerak"]
    },
    email: {
        type: String,
        set: value => value.trim().toLowerCase(),
        match: [/^\S+@\S+\.\S+$/, "Email formati noto‘g‘ri"]
    },
    password: {
        type: String,
        required: true,
        minLength: [7, "password kamida 7 ta belgi yoki harfadan iborat bo'lishi kerak"],
        trim: true,
        match: [/^[a-zA-Z0-9@!£]+$/]
    }

},
{
    versionKey: false,
    timestamps: true
})

module.exports = model("User", UserSchema)