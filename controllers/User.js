const User = require("../models/User")

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        if (newUser) return res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
}
const updateUser = async (req, res) => {
    try {
        if (req.body.bookmark) {
            const user = await User.findOne({ user_id: req.params.id })
            console.log("bookmark user: ", user)
            if (!user) {
                return res.status(404).json({ message: "User malumotlari topilmadi !" })
            }

            if (!user.bookmarks.includes(req.body.bookmark)) {
                user.bookmarks.push(req.body.bookmark)
                await user.save()
            } else {
                return res.status(300).json({ message: "Bookmark allaqachon yaratilgan !" })
            }

            console.log("this is a bookmark: ", user)
            return res.status(201).json(user)
        }

        const updateduser = await User.findOneAndUpdate({ user_id: req.params.id }, {
            $set: req.body,
        }, { new: true })
        if (!updateduser._id) return res.status(404).json({ message: "User o'zgartirilmadi !" })

        res.status(200).json(updateduser)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getOneUser = async (req, res) => {
    try {
        const getOne = await User.findOne({
            user_id: req.params.id
        })
        if (!getOne) return res.status(404).json({
            message: "User topilmadi."
        })
        res.status(200).json(getOne)
    } catch (error) {
        res.status(500).json({
            message: "user topilmadi"
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const getAll = await User.find()
        console.log("get all", getAll)
        return res.status(200).json(getAll)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getOneUser,
    getAllUsers,
}