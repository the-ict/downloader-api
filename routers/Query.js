const router = require("express").Router()

const {
    createQuery,
    updateQuery,
    deleteQuery,
    getQuerys,
    clickLeft,
    clickRight,
} = require("../controllers/Query")

// create query
router.post("/", createQuery)

// update query
router.put("/:id", updateQuery)

// delete query
router.delete("/:id", deleteQuery)

// get query
router.get("/:id", getQuerys)

router.put("/click-left/:id", clickLeft)
router.put("/click-right/:id", clickRight)

module.exports = router