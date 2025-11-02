const express = require("express")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage})
const router = express.Router()
const {predict, leaderBoard} = require("../controller/controller")
const authMiddleware = require("../middleware/middleware")

router.post("/predict",authMiddleware,upload.single("file"),predict)
router.get("/leaderBoard",leaderBoard)

module.exports = router