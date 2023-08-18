const Post = require("../models/Post")

const post = async (req, res) => {
    const { username, email, content } = req.body
    const post = new Post(req.body)

    const savePost = await post.save()

    return res.status(200).json(savePost)
}

const getPosts = async(req,res) => {
    const posts = await Post.find()

    return res.status(200).json(posts)
}



exports.post = post
exports.getPosts = getPosts