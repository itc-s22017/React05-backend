const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/VerifyToken');
const { getUsers } = require('../controller/usersController');

router.get('/', verifyToken, getUsers);

module.exports = router;