const User = require("../models/User")

const getUsers = async (req, res) => {
    const users = await User.find().select('name email');

    return res.status(200).json({ users });
};

exports.getUsers = getUsers;