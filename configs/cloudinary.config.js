const { CLOUD_API, CLOUD_NAME, CLOUD_SECRET } = require("../configs/config");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API,
  api_secret: CLOUD_SECRET,

});

module.exports = cloudinary;
