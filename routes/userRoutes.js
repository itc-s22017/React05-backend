const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/VerifyToken');
const { getUsers, getUserFromParam } = require('../controller/usersController');

router.get('/', verifyToken, getUsers);
router.get('/:id', getUserFromParam)

module.exports = router;