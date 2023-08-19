const express = require('express');
const router = express.Router();
const { post , getPosts, getPersonPosts,deletePost} = require("../controller/postController")

router.post("/",post)
router.get("/getAll",getPosts)
router.get("/profile/:username",getPersonPosts)
router.delete("/delete/:id",deletePost)

module.exports = router