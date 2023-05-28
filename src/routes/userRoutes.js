const express = require("express");

const router = express.Router();
const {
  loginValidationRules,
  registerValidationRules,
} = require("../validations/user");
const {
  registerUser,
  loginUser,
  updateUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const cors = require("cors");
// enable CORS for all routes in this router
router.use(cors());

router.post("/", registerValidationRules, registerUser);
router.post("/login", loginValidationRules, loginUser);
router.get("/me", protect, getMe);

router.route("/:id").put(protect, updateUser);

module.exports = router;
