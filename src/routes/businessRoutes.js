const express = require("express");
const router = express.Router();
const { bussinessValidationRules } = require("../validations/business");
const {
  registerBusiness,
  getBusinesses,
  getBusiness,
} = require("../controllers/businessController");

router.post("/", registerBusiness);

router.get("/", getBusinesses);
router.get("/:id", getBusiness);

module.exports = router;
