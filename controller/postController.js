const Post = require("../models/Post")
const User = require("../models/User")

//投稿
const post = async (req, res) => {
    const { username, email, content } = req.body
    const post = new Post(req.body)

    const savePost = await post.save()

    return res.status(200).json(savePost)
}

//投稿全部取る
const getPosts = async (req, res) => {
    const posts = await Post.find()

    return res.status(200).json(posts)
}

//特定の人の投稿を全部取る
const getPersonPosts = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.username })
        const posts = await Post.find({ username: user.name })
        return res.status(200).json(posts)
    } catch (e) {
        return res.status(400).json(e)
    }
}

//投稿を削除する
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.id === req.params.id) {
            await post.deleteOne()
        }
        return res.status(200).json(post)
    } catch (e) {
        return res.status(400).json("delete failed")

    }
}



exports.post = post
exports.getPosts = getPosts
exports.getPersonPosts = getPersonPosts
exports.deletePost = deletePost