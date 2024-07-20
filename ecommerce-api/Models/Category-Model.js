const mongoose = require("mongoose");

// Define the schema
const categories = new mongoose.Schema(
  {
    Categoryname: {
      type: String,
    },
    featured: [
      {
        name: String,

        imageSrc: String,
      },
    ],
    sections: [
      {
        name: String,

        items: [
          {
            name: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model
module.exports = mongoose.model("category", categories);
