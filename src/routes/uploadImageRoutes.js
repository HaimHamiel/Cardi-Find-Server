const express = require("express");
const multer = require("multer");
const {
  getImage,
  uploadImage,
} = require("../controllers/uploadImageController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//GET IMAGE
router.get("/:key", protect, getImage);

//UPLOAD IMAGE TO MEMORY
router.post("/", upload.single("image"), uploadImage);

module.exports = router;
