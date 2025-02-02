const mongoose = require("mongoose")

const User = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    bookmarks: {
        type: Array,
        defualt: []
    },
    password: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("User", User)