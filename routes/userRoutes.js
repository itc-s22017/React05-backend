const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/VerifyToken');
const { getUsers, getUserFromParam,flagFollow,isFollowing,getFollowings } = require('../controller/usersController');

router.get('/', verifyToken, getUsers);
router.get('/:id', getUserFromParam)
router.put("/:id/follow",flagFollow)
router.get("/:id/isFollowing",isFollowing)
router.get("/:id/getFollowings",getFollowings)

module.exports = router;