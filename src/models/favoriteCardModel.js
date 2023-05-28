const mongoose = require("mongoose");

const favoriteCardSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    creditCardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
        ref: "CreditCard"
    },
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
  isFavorite: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model("FavoriteCard", favoriteCardSchema);