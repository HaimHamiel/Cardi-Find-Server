const asyncHandler = require("express-async-handler");
const CreditCard = require("../models/cardModel");
const {
  findCreditCard,
  findCreditCards,
  addCreditCard,
} = require("../services/creditCardService");
const axios = require("axios");

const API_URLS = [
  "https://www.max.co.il/api/lobby/getLobby?lobbyName=cards&page=0&isMobile=false&catHashName=all&v=V3.94-MASTER-newFairCredit",
  "https://www.max.co.il/api/lobby/getLobby?lobbyName=cards&page=0&isMobile=false&catHashName=food&v=V3.94-MASTER-newFairCredit",
  "https://www.max.co.il/api/lobby/getLobby?lobbyName=cards&page=0&isMobile=false&catHashName=job&v=V3.94-MASTER-newFairCredit",
  "https://www.max.co.il/api/lobby/getLobby?lobbyName=cards&page=0&isMobile=false&catHashName=bus&v=V3.94-MASTER-newFairCredit",
];

// @desc Register a new card
// @route POST /api/credit-cards/
// @access Private
const registerCreditCard = asyncHandler(async (req, res) => {
  try {
    const requests = API_URLS.map((url) => axios.get(url));
    let creditCardPromises = [];
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          responses.forEach((response) => {
            if (!response?.data?.result?.categories) {
              throw new Error("Failed to get dataCategories");
            }
            const dataCategories = response.data.result.categories.filter(
              (item) => item.pages !== null
            );
            dataCategories.forEach((category) => {
              if (Array.isArray(category.pages.pages)) {
                category.pages.pages.forEach((cardData) => {
                  let filter = { cardName: cardData.title };
                  let update = {
                    cardName: cardData.title,
                    image: cardData.image.url,
                    details: cardData.subtitle,
                    category: category.hashName,
                  };
                  let options = {
                    new: true,
                    upsert: true,
                  };
                  creditCardPromises.push(
                    addCreditCard(filter, update, options)
                  );
                  if (!creditCardPromises || creditCardPromises.length === 0) {
                    return res
                      .status(404)
                      .json({ message: "Error with registerCreditCard" });
                  }
                });
              } else {
                return new Error("Error with registerCreditCard");
              }
            });
          });
        })
      )
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: "Error with registerCreditCard" });
      })
      .then(() => {
        return Promise.all(creditCardPromises);
      })
      .then((creditCards) => {
        console.log("creditCards fetched");
        if (res) {
          return res.status(201).json(creditCards);
        }
      });
  } catch (error) {
    console.log(error);
    if (res) {
      return res.status(500).json({ message: "Server error." });
    }
  }
});

// @desc get all cards
// @route GET /api/credit-cards/
// @access Public
const getCreditCards = asyncHandler(async (req, res) => {
  try {
    const { category, page } = req.query;
    const itemsPerPage = 20;
    let query = {};
    if (category) {
      query = { category: category };
    }

    const totalCards = await CreditCard.countDocuments(query);
    const totalPages = Math.ceil(totalCards / itemsPerPage);

    const creditCards = await findCreditCards(query)
      .skip(itemsPerPage * (page - 1))
      .limit(itemsPerPage);

    if (!creditCards || creditCards.length === 0) {
      return res.status(404).json({ message: "creditCards not found." });
    }
    return res.status(200).json({ creditCards, totalPages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

// @desc get a  single card
// @route GET /api/credit-cards/:id
// @access Public
const getCreditCard = asyncHandler(async (req, res) => {
  try {
    const creditCard = await findCreditCard(req.params.id);
    if (!creditCard || creditCard.length === 0) {
      return res.status(404).json({ message: "creditCard not found." });
    }
    return res.status(200).json(creditCard);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = {
  registerCreditCard,
  getCreditCards,
  getCreditCard,
};
