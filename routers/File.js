const router = require("express").Router()

const { createFile, updateFile, deleteFile, getFiles, deleteFiles,getOneFile } = require("../controllers/File")

// create File
router.post("/", createFile)

// update File
router.put("/:id", updateFile)

// delete File
router.delete("/:id", deleteFile)

router.delete("/", deleteFiles)

// get Files
router.get("/:id", getFiles)

router.get("/one/:id", getOneFile)

module.exports = router