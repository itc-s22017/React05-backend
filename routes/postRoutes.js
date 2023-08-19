const express = require('express');
const router = express.Router();
const { post , getPosts, getPersonPosts} = require("../controller/postController")

router.post("/",post)
router.get("/getAll",getPosts)
router.get("/profile/:username",getPersonPosts)

module.exports = router