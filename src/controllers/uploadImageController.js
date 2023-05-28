const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sharp = require("sharp");
const { uploadFile } = require("../config/s3");
const { updateProfile } = require("../services/userService");

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// @desc Get Image
// @route /api/upload/images/:key
// @access Private
const getImage = asyncHandler(async (req, res) => {
  try {
    if (!req?.params?.key) {
      throw new Error("Failed to get image key");
    }
    const key = req.params.key;
    const readStream = getFileStream(key);
    if (!readStream) {
      throw new Error("Failed to get readStream");
    }
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

// @desc UPLOAD IMAGE
// @route /api/upload/images
// @access Private
const uploadImage = asyncHandler(async (req, res) => {
  try {
    const file = req?.file;
    const imageName = generateFileName();
    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();
    if (!fileBuffer) {
      throw new Error("Failed to get fileBuffer");
    }
    await uploadFile(fileBuffer, imageName, file.mimetype);
    //TODO Send to DB
    // if (!user || user.length === 0) {
    //   return res.status(404).json({ message: "User not updated." });
    // }
    // const update = { imageProfile: imageName };
    // const options = {
    //   new: true,
    // };
    // let updatedUser = await updateProfile(req.user.id, update, options);
    // if (!updatedUser || updatedUser.length === 0) {
    //   return res.status(404).json({ message: "User not updated." });
    // }
    // return res.status(201).json(updatedUser);
    return res.status(201).json("Successful");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = {
  getImage,
  uploadImage,
};
