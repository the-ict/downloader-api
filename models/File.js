const { Schema, model } = require("mongoose")

const File = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isSecret: {
        type: Boolean,
        default: false
    },
    downloadUrl: {
        type: Object,
        required: true,
        unique: false
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = model("File", File)