const Post = require("../models/Post")
const User = require("../models/User")

//投稿
const post = async (req, res) => {
    const post = await new Post(req.body)

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
        const user = await User.findById(req.params.id)
        const posts = await Post.find({ userId: user._id })
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

//投稿にいいねを押す
const like = async (req, res) => {
    const { userId } = req.body //自分のuserId
    const post = await Post.findById(req.params.id)
    try {
        // まだいいねしてなかったらいいねする。してたら外す
        if (!post.likes.includes(userId)) {
            await post.updateOne({
                $push: {
                    likes: userId
                }
            })
            return res.status(200).json("いいねしました")
        } else {
            await post.updateOne({
                $pull: {
                    likes: userId
                }
            })
            return res.status(200).json("いいねを外しました")
        }
    } catch (e) {
        return res.status(400).json("liked error")
    }
}

//投稿のいいね数を取得するやつ && 自分がすでにいいねしてるか : Boolean
const countLikes = async (req, res) => {
    const { userId } = req.body
    const post = await Post.findById(req.params.id)
    try {
        const isLiked = await post.likes.includes(userId)
        return res.status(200).json({ length: post.likes.length, isLiked })
    } catch (e) {
        return res.status(400).json(e)
    }
}

//postIdからいいねしたユーザーを取得
const getUserFromLikes = async (req, res) => {
    // const arr = [
    //     "64e596adfb8a6f91cd0d3dad",
    //     "64dc26d34b2f4353d2da03fb",
    // ]
    try {
        const post = await Post.findById(req.params.id)
        const users = await Promise.all(post.likes.map(async (data) => {
            return await User.findById(data).select("_id name")
        }))
        return res.status(200).json(users)
    } catch (e) {
        return res.status(400).json(e)
    }
}

// reply用 paramsから投稿を一個取得
const getPostFromParam = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        return res.status(200).json(post)
    } catch (e) {
        return res.status(400).json(e)
    }
}

//reply送ったらschemaのrepliesに入れる
const setReplies = async (req, res) => {
    const post = await Post.findById(req.params.postId)
    try {

        await post.updateOne({
            $push: {
                replies: req.body.postId
            }
        })
        return res.status(200).json("Success")

    } catch (e) {
        return res.status(400).json("リプレイ失敗")
    }
}

const getReplies = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        const posts = await Promise.all(post.replies.map(async (data) => {
            return await Post.findById(data)
        }))
        return res.status(200).json(posts)
    } catch (e) {
        return res.status(400).json(e)
    }
}

//コメント数を返すやつだけどバグってます
const getNumberOfcomment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        const valid = await Promise.all(post.replies.filter(async (data) => {
            return await Post.findById(data);
        }))

        const filteredReplies = valid.filter(reply => reply !== null);
        const length = filteredReplies.length
        return res.status(200).json(length)
    } catch (e) {
        return res.status(400).json(e)
    }
}



exports.post = post
exports.getPosts = getPosts
exports.getPersonPosts = getPersonPosts
exports.deletePost = deletePost
exports.like = like
exports.countLikes = countLikes
exports.getUserFromLikes = getUserFromLikes
exports.getPostFromParam = getPostFromParam
exports.setReplies = setReplies
exports.getReplies = getReplies
exports.getNumberOfcomment = getNumberOfcomment