const express = require("express");
const routers = express.Router();
const business = require("./businessRoutes");
const user = require("./userRoutes");
const card = require("./creditCardRoutes");
const favorite = require("./favoriteCardsRoutes");
const upload = require("./uploadImageRoutes");

routers.use("/api/businesses", business);
routers.use("/api/users", user);
routers.use("/api/credit-cards", card);
routers.use("/api/favorites", favorite);
routers.use("/api/upload", upload);

module.exports = routers;