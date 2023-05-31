const express = require("express");
const router = express.Router();
const { cardValidationRules } = require("../validations/card");
const {
  registerCreditCard,
  getCreditCards,
  getCreditCard,
} = require("../controllers/creditCardController");

router.post("/", registerCreditCard);

router.get("/", getCreditCards);
router.get("/:id", getCreditCard);

module.exports = router;
