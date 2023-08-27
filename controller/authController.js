const bcrypt = require('bcrypt');
const User = require('../models/User');
const Token = require('../models/Token');

const jwt = require('jsonwebtoken');

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const checkUsername = await User.findOne({ name: name })
    if (checkUsername) {
        return
    }
    const user = await User.create({
        name,
        email,
        password: passwordHash,
    });

    const token = generateToken(user.email);
    const refresh_token = generateRefreshToken(user.email);

    await Token.create({
        userId: user._id,
        token: refresh_token,
    });

    return res.status(201).json({ message: 'ユーザが作成されました。', token, refresh_token });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) { return res.status(400).json({ message: "Not Found User" }) }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {return res.status(400).json({ message: "Password Incorrect" })}

        const token = generateToken(user.email);
        const refresh_token = generateRefreshToken(user.email);
        // const user2 = await User.findOne({ email }).select("-password")

        await Token.create({
            userId: user._id,
            token: refresh_token,
        })

        return res.status(200).json({ message: "Login Succes", token, refresh_token })
    } catch (e) {
        return res.status(400).json({ message: "Login Failed" })
    }
}

const user = async (req, res) => {
    const email = req.email;
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'ユーザは存在しません。' });
    }

    return res.status(200).json({ user });
};

const generateRefreshToken = (email) => {
    return jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
};

const refreshToken = async (req, res) => {
    const { refresh_token } = req.body;

    const token = await Token.findOne({ token: refresh_token });
    if (!token) {
        return res.status(401).json({ message: '有効でないトークンです。' });
    }

    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: '有効でないトークンです。' });
            } else {
                const email = decoded.email;
                const token = generateToken(email);

                return res
                    .status(201)
                    .json({ message: '新しいアクセストークンを作成しました。', token });
            }
        }
    );
};

const removeToken = async (req, res) => {
    // const { refresh_token } = req.body;

    try {
        const token = await Token.findOne({ token: req.params.id })
        if (!token) {
            return res
                .status(200)
                .json({ message: 'ログアウト処理が完了しました。' });
        } else {
            await token.deleteOne()
            return res
                .status(200)
                .json({ message: 'ログアウト処理が完了しました。' });
        }
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};


exports.signup = signup;
exports.login = login;
exports.user = user
exports.refreshToken = refreshToken
exports.removeToken = removeToken