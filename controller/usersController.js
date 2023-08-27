const User = require("../models/User")

// ユーザー情報取得
const getUsers = async (req, res) => {
    const users = await User.find().select('name email');

    return res.status(200).json({ users });
};

//ユーザー情報取得する
const getUserFromParam = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select("-password -__v")
        return res.status(200).json(user)
    } catch (e) {
        return res.status(400).json(e)
    }
}

//フォローする相手が自分じゃない && フォローしていたら外す、してなかったらする
const flagFollow = async (req, res) => {
    const { userId } = req.body
    const { id } = req.params
    if (userId !== id) {
        try {
            const jibun = await User.findById(userId)
            const aite = await User.findById(id)

            if (!aite.followers.includes(userId)) {
                await aite.updateOne({
                    $push: {
                        followers: userId
                    }
                })

                await jibun.updateOne({
                    $push: {
                        followings: id
                    }
                })

                return res.status(200).json({ message: "follow Success" })
            } else {
                await aite.updateOne({
                    $pull: {
                        followers: userId
                    }
                })

                await jibun.updateOne({
                    $pull: {
                        followings: id
                    }
                })
                return res.status(200).json({ message: "unfollow Success" })
            }
        } catch (e) {
            return res.status(400).json(e)
        }
    } else {
        return res.status(400).json("自分自身")
    }
}

//フォロー中かどうか : Boolean
const isFollowing = async (req, res) => {
    const { userId } = req.body // me 
    const { id } = req.params // him

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const is = user.followers.includes(userId);

        if (is) {
            return res.status(200).json(true);
        } else {
            return res.status(200).json(false);
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

// paramからフォロー中とフォロワー取得
const getFollowings = async (req, res) => {
    const { userId } = req.body
    const { id } = req.params
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const usersFollowers = await Promise.all(user.followers.map(async (data) => {
            return await User.findById(data).select("_id name");
        }))

        const usersFollowings = await Promise.all(user.followings.map(async (data) => {
            return await User.findById(data);
        }))

        return res.status(200).json({ followers: usersFollowers, followings: usersFollowings })
    } catch (e) {
        return res.status(400).json(e)
    }
}

exports.getUsers = getUsers;
exports.getUserFromParam = getUserFromParam;
exports.flagFollow = flagFollow
exports.isFollowing = isFollowing
exports.getFollowings = getFollowings