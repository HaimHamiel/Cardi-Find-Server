const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  cardName: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Please add an image"],
  },
  details: {
    type: String,
    required: [true, "Please enter details about the card"],
  },
  category: {
    type: String,
  }
});

module.exports = mongoose.model("CreditCard", cardSchema);
