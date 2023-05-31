const asyncHandler = require("express-async-handler");
const {
  findBusiness,
  findBusinesses,
  addBusiness,
} = require("../services/businessService");
const axios = require("axios");

const API_URL =
  "https://www.max.co.il/api/benefitsPlus/getDiscountsPlus?isMobile=false&page=1&loadLobby=false&v=V3.94-HF-OLD.6";

// @desc Register a new business
// @route POST /api/businesses/
// @access Private
const registerBusiness = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(API_URL);

    if(!response?.data?.result?.discounts){
      throw new Error("Failed to get discounts");
    }
    const businessesData = response.data.result.discounts;

    const businesses = [];
    for (let element of businessesData) {
      let description = element.description.replace(/(<([^>]+)>)/gi, "");
      let imageUrl = element.businessLogo.url;
      if (imageUrl === "") {
        imageUrl = element.type.defaultImage.url;
      }

      let filter = { businessName: element.title };
      let updateParams = {
        businessName: element.title,
        image: imageUrl,
        details: description,
        location: element.businessAddress,
        businessType: element.type.typeUrlName,
        discountPercent: element.discountPercent,
      };
      const options = {
        new: true,
        upsert: true,
      };
      const business = await addBusiness(filter, updateParams, options);
      if (!business || business.length === 0) {
        return res.status(404).json({ message: "Business not found." });
      }
      businesses.push(business);
    }

    if (!businesses || businesses.length === 0) {
      return res.status(404).json({ message: "Businesses not found." });
    }
    console.log("Businesses fetched");
    if(res){
      return res.status(200).json(businesses);
    }
    
  } catch (error) {
    console.log(error);
    if(res){
    return res.status(500).json({ message: "Server error." });
    }
  }
});

// @desc get all businesses
// @route GET /api/businesses/
// @access Public
const getBusinesses = asyncHandler(async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query = { businessType: category };
    }
    const businesses = await findBusinesses(query);
    if (!businesses || businesses.length === 0) {
      return res.status(404).json({ message: "Businesses not found." });
    }
    return res.status(200).json(businesses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

// @desc get a  single business
// @route GET /api/businesses/:id
// @access Public
const getBusiness = asyncHandler(async (req, res) => {
  try {
    const business = await findBusiness(req.params.id);
    if (!business || business.length === 0) {
      return res.status(404).json({ message: "Business not found." });
    }
    return res.status(200).json(business);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = {
  registerBusiness,
  getBusinesses,
  getBusiness,
};
