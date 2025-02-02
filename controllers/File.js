const File = require("../models/File")
const { generateThumbnail } = require("../config/createThumbnail.js")
const { getDownloadUrl, getFormatId } = require("../config/downloadVideo.js")
const User = require("../models/User.js")


const createFile = async (req, res) => {
    try {
        const { ip, port } = req.body
        const formats = await getFormatId(req.body.url)
        const downloadUrls = await getDownloadUrl(req.body.url, formats)
        const fileName = req.body.name + Date.now() + ".png"

        await generateThumbnail(downloadUrls[0].downloadUrl, fileName)

        const getOne = await User.findOne({ user_id: req.body.user_id })
        if (!getOne) return res.status(404).json({ message: "bunday user Mavjud emas !" })

        const newFile = new File({
            name: req.body.name,
            image: fileName,
            isSecret: req.body.isSecret,
            user_id: req.body.user_id,
            downloadUrl: downloadUrls
        })

        const savedFile = await newFile.save()

        if (!savedFile) return res.status(400).json({
            message: "Saqlashda muammo bo'ldi !"
        })

        res.status(200).json(savedFile)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateFile = async (req, res) => {
    try {
        const getOne = await User.findOne({ user_id: req.body.user_id })
        if (!getOne) return res.status(404).json({ message: "Bunday user mavjud emas !" })

        const updatedFile = await File.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedFile)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteFile = async (req, res) => {
    try {
        const getOne = await User.findOne({ user_id: req.query.user_id })
        if (!getOne) return res.status(404).json({ message: "Bunday user mavjud emas !" })

        await File.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: "So'rov o'chirib tashlandi !" })
            })
            .catch(err => console.log("error: ", err))
    } catch (error) {
        res.status(500).json(error)
    }
}

const getFiles = async (req, res) => {
    try {
        const getOne = await User.findOne({ user_id: req.params.id })
        if (!getOne) return res.status(404).json({ message: "bunday user Mavjud emas !" })

        const allFiles = await File.find({ user_id: req.params.id })
        res.status(200).json(allFiles)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteFiles = async (req, res) => {
    try {
        const getOne = await User.findOne({ user_id: req.body.user_id })
        if (!getOne) return res.status(404).json({ message: "bunday user Mavjud emas !" })

        const getFiles = await File.find({ user_id: req.body.user_id });

        for (const file of getFiles) {
            await file.deleteOne();
            console.log("O'chirildi!");
        }

        res.status(200).json("Hammasi o'chirildi");
    } catch (error) {
        console.error("Xatolik:", error);
        res.status(500).json("Xatolik yuz berdi");
    }
}

const getOneFile = async (req, res) => {
    try {
        const getOne = await User.findOne({ user_id: req.body.user_id })
        if (!getOne) return res.status(404).json({ message: "bunday user Mavjud emas !" })

        const oneFile = await File.findById(req.params.id)
        if (oneFile) return res.status(200).json(oneFile)
        res.status(404).json({ message: "File topilmadi !" })
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    createFile,
    updateFile,
    deleteFile,
    getFiles,
    deleteFiles,
    getOneFile
};