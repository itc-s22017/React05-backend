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
    userId: {
        type:String,
        required:true
    },
    email: {
        type: String,
        default:""
    },
    likes: { 
        type: Array ,
        default:[]
    },
    replies: {
        type:Array,
        default:[]
    },
    reply: {
        type:Boolean,
        default:false
    }
}, { timestamps: true })

module.exports = mongoose.model("Post", PostSchema)