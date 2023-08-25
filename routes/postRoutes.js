const express = require('express');
const router = express.Router();
const {
    post, getPosts, getPersonPosts, deletePost,
    like, countLikes, getUserFromLikes,getPostFromParam,
    setReplies,getReplies,getNumberOfcomment
} = require("../controller/postController")

router.post("/", post)
router.get("/getAll", getPosts)
router.get("/profile/:id", getPersonPosts)
router.delete("/delete/:id", deletePost)
router.put("/like/:id", like)
router.get("/countLikes/:id", countLikes)
router.get("/getUserfromlikes/:id", getUserFromLikes)
router.get("/getPostFromParam/:postId", getPostFromParam)
router.post("/setReply/:postId", setReplies)
router.get("/getReply/:postId", getReplies)
router.get("/getNumberOfComment/:postId", getNumberOfcomment)






module.exports = router