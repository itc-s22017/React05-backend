const express = require('express');
const router = express.Router();
const { post , getPosts} = require("../controller/postController")

router.post("/",post)
router.get("/getAll",getPosts)

module.exports = router