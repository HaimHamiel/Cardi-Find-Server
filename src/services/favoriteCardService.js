const FavoriteCard = require("../models/favoriteCardModel");

const findFavoriteCard = (query) => {
  return FavoriteCard.findById(query);
};

const findFavoriteCards = (query) => {
  return FavoriteCard.find(query);
};

const addFavoriteCard = (filter, updateParams, options) => {
  return FavoriteCard.findOneAndUpdate(filter, updateParams, options);
};

const removeFavoriteCard = (params) => {
  return FavoriteCard.findOneAndDelete(params);
};

module.exports = {
  findFavoriteCard,
  findFavoriteCards,
  addFavoriteCard,
  removeFavoriteCard,
};
