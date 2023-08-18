const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        maxLength: 140,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true },
    likes: { type: Array }
}, { timestamps: true })

module.exports = mongoose.model("Post", PostSchema)