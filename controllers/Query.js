const Query = require("../models/Query")
const User = require("../models/User")

const createQuery = async (req, res) => {
    try {
        const getOne = await User.findOne({ user_id: req.body.user_id })
        if (!getOne) return res.status(404).json({ message: "Bunday user mavjud emas !" })

        const saveQuery = await Query.create(req.body)
        res.status(201).json(saveQuery)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateQuery = async (req, res) => {
    try {
        const getOne = await User.findOne({ user_id: req.body.user_id })
        if (!getOne) return res.status(404).json({ message: "Bunday user mavjud emas !" })

        const query = await Query.findById(req.params.id)

        if (req.body?.name) {
            const correct = query.name === req.body.name
            if (correct) {
                const newCurrentIndex = await Query.findByIdAndUpdate(req.params.id, {
                    currentIndex: query.history.length
                }, { new: true })
                return res.status(300).json({
                    message: "Oldingi va hozirgi query bir xil shuning uchun bu no'to'g'ri !",
                    newCurrentIndex: newCurrentIndex
                })
            }
        }

        if (req.body?.currentIndex) {
            console.log("currentIndexni o'zgartirishmoqchi", req.body.currentIndex)
            const updatedQuery = await Query.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })

            return res.status(200).json(updatedQuery)
        }

        const updatedQuery = await Query.findByIdAndUpdate(req.params.id, {
            $set: req.body,
            $push: {
                history: query.name
            },
            currentIndex: query.history.length + 1
        }, { new: true })

        res.status(200).json(updatedQuery)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteQuery = async (req, res) => {
    try {
        const getOne = await User.findOne({ user_id: req.query.user_id })
        if (!getOne) return res.status(404).json({ message: "Bunday user mavjud emas !" })

        await Query.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: "Query o'chirib tashlandi !" })
            })
            .catch(err => console.log("error: ", err))
    } catch (error) {
        res.status(500).json(error)
    }
}

const getQuerys = async (req, res) => {
    try {
        const getOne = await User.findOne({ user_id: req.params.id })
        if (!getOne) return res.status(404).json({ message: "Bunday user mavjud emas !" })

        const allQuery = await Query.find({ user_id: req.params.id })
        res.status(200).json(allQuery)
    } catch (error) {
        console.log("find query errror", error)
        res.status(500).json(error)
    }
}

const clickLeft = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id)
        if (!query) {
            return res.status(404).json({ message: "Query mavjud emas !" })
        }

        if (query.currentIndex > 0) {
            query.currentIndex -= 1
            await query.save()
        }
        res.status(200).json(query)
    } catch (error) {
        console.log(error)
    }
}


const clickRight = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id)
        if (!query) {
            return res.status(404).json({ message: "Query mavjud emas !" })
        }

        console.log("right: ", query.currentIndex)
        console.log("right: ", query.history.length)

        if (query.currentIndex < query.history.length) {
            console.log("right: shartga to'g'ri keldi !")
            query.currentIndex += 1
            await query.save()
        }
        res.status(200).json(query)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createQuery,
    updateQuery,
    deleteQuery,
    getQuerys,
    clickLeft,
    clickRight
};