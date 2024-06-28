var cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
var cloudinary = require("./cloudinaryConfig");
var multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products image",
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
