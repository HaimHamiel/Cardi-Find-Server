const express = require("express");
const router = express.Router();
const {
  getFavorites,
  getFavorite,
  createFavorite,
  removeFavorite
} = require("../controllers/favoriteCardController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getFavorites).post(protect, createFavorite);

router.route("/:id").get(protect, getFavorite).delete(protect, removeFavorite);

module.exports = router;
