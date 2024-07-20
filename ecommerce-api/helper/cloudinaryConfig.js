var cloudinary = require("cloudinary").v2;

const Cloudinary = () => {
  // Configuration

  cloudinary.config({
    cloud_name: "dxlhsjyyc",
    api_key: "385417853566955",
    api_secret: "hhTBgw_b2cfYZ6F_T8WlnwCtHkE", // Make sure to keep your API secret secure
  });
};

Cloudinary();

module.exports = cloudinary;
