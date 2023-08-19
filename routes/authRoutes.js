const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signup, login, user,refreshToken,removeToken } = require('../controller/authController');
const verifyToken = require('../middleware/VerifyToken');


router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, user);
router.post('/refresh_token',refreshToken)
router.delete('/remove_token/:id', removeToken);




module.exports = router;