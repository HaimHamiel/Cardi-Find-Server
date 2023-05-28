const Business = require("../models/businessModel");

const findBusiness = (query) => {
  return Business.findById(query);
};

const findBusinesses = (query) => {
  return Business.find(query);
};

const addBusiness = (filter, updateParams, options) => {
  return Business.findOneAndUpdate(filter, updateParams, options);
};

module.exports = {
  findBusiness,
  findBusinesses,
  addBusiness,
};
