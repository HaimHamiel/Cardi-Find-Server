const mongoose = require("mongoose");

const businessSchema = mongoose.Schema({
  businessName: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
  },
  image: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
  },
  details: {
    type: String,
    required: [true, "Please enter details about the business"],
  },
  location: {
    type: String,
    default: "Israel",
  },
  businessType: {
    type: String,
    required: [true, "Please enter the business type"],
  },
  discountPercent: {
    type: Number,
  },
});

module.exports = mongoose.model("Business", businessSchema);
