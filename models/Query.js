const { Schema, model } = require("mongoose")

const Query = new Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    history: {
        type: Array,
        default: []
    },
    currentIndex: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = model("Query", Query)
