const router = require("express").Router()
const { createUser, updateUser, deleteUser,
    getOneUser, getAllUsers
} = require("../controllers/User")

// yaratish
router.post("/", createUser)

// update qilish
router.put("/:id", updateUser)

// delete user
router.delete("/:id", deleteUser)

// get user one
router.get("/:id", getOneUser)

// get user all
router.get("/all", getAllUsers)


module.exports = router