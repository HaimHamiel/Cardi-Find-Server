const CreditCard = require("../models/cardModel");

const findCreditCard = (query) => {
  return CreditCard.findById(query);
};

const findCreditCards = (query) => {
  return CreditCard.find(query);
};

const addCreditCard = (filter, updateParams, options) => {
  return CreditCard.findOneAndUpdate(filter, updateParams, options);
};

module.exports = {
  findCreditCard,
  findCreditCards,
  addCreditCard,
};
