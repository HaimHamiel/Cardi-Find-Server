const User = require("../models/userModel");

const findUser = (query, type = "email") => {
  if (type === "email") {
    return User.findOne({ email: query });
  } else if (type === "id") {
    return User.findById(query);
  } else {
    throw new Error("Invalid query type.");
  }
};

const findUsers = (query) => {
  return User.find(query);
};

const addUser = (name, email, password, status) => {
  return User.create({
    name: name,
    email: email,
    password: password,
    status: status,
  });
};

const updateProfile = (id, body, options) => {
  return User.findByIdAndUpdate(id, body, options);
};

module.exports = {
  findUser,
  findUsers,
  addUser,
  updateProfile,
};
