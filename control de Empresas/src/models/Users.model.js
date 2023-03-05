"user strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = Schema({
    Name: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("users", UserSchema);