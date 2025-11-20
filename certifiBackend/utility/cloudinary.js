const cloudinary = require('cloudinary').v2;
// const upload = require("../utils/multer");

cloudinary.config({
  cloud_name: "dcwi7rrhk",
  api_key: "858788497628611",
  api_secret: "u5hL7Y_-nq94yXus6gQ32qpZ2K0",
});

const getImageUrl = async (imageFile) => {
  try {
    const cloud = await cloudinary.uploader.upload(imageFile);
    return cloud.secure_url;
  } catch (error) {
    throw error;
  }
};

module.exports = { getImageUrl };