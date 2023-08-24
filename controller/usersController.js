const User = require("../models/User")

const getUsers = async (req, res) => {
    const users = await User.find().select('name email');

    return res.status(200).json({ users });
};

//ユーザー情報取得する
const getUserFromParam = async (req, res) => {
    try {
        const user = await User.findOne({_id:req.params.id}).select("-password -__v")
        return res.status(200).json(user)
    } catch (e) {
        return res.status(400).json(e)
    }

}

exports.getUsers = getUsers;
exports.getUserFromParam = getUserFromParam;