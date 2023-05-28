const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const {
  findFavoriteCard,
  findFavoriteCards,
  addFavoriteCard,
  removeFavoriteCard,
} = require("../services/favoriteCardService");

const {
 findUser,
} = require("../services/userService");

// @desc Create new favorite card
// @route POST /api/favorites
// @access Private
const createFavorite = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req?.user?.id, "id");
    const { creditCardId, cardName, image, details, favoriteCard } = req.body;

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User Not found." });
    }

    let filter = { cardName: cardName };
    let options = {
      new: true,
      upsert: true,
    };
    let update = {
      user: req.user.id,
      creditCardId: creditCardId,
      cardName: cardName,
      image: image,
      details: details,
      isFavorite: favoriteCard,
    };
    const favorite = await addFavoriteCard(filter, update, options);

    if (!favorite || favorite.length === 0) {
      return res.status(404).json({ message: "Error with createFavorite" });
    }
    return res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

// @desc Get user favorite cards
// @route GET /api/favorites
// @access Private
const getFavorites = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req?.user?.id, "id");

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User Not found." });
    }

    const favorites = await findFavoriteCards({ user: req.user.id });
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: "favoritecCards not found." });
    }
    return res.status(200).json(favorites);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

// @desc Get user favorite card
// @route GET /api/favorites/:id
// @access Private
const getFavorite = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req?.user?.id, "id");
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User Not found." });
    }

    const favorite = await findFavoriteCard(req.params.id);

    if (!favorite || favorite.length === 0) {
      return res.status(404).json({ message: "favoritecCard not found." });
    }

    if (favorite.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized." });
    }
    return res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

// @desc Delete favorite card
// @route DELETE /api/favorites/:id
// @access Private
const removeFavorite = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req?.user?.id, "id");

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User Not found." });
    }

    const params = {
      _id: req.params.id,
      user: req.user.id,
    };
    const favorite = await removeFavoriteCard(params);
    if (!favorite || favorite.length === 0) {
      return res.status(404).json({ message: "favoritecCard not found." });
    }
    return res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = {
  getFavorites,
  getFavorite,
  createFavorite,
  removeFavorite,
};
