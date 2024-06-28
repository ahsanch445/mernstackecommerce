const mongoose = require("mongoose");

const uri = "mongodb://ach374392:CFK2y2glTBITQTwK@ac-xnxo58f-shard-00-00.v83uw1i.mongodb.net:27017,ac-xnxo58f-shard-00-01.v83uw1i.mongodb.net:27017,ac-xnxo58f-shard-00-02.v83uw1i.mongodb.net:27017/?ssl=true&replicaSet=atlas-7ih05f-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ecommerce";

mongoose.connect(uri)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
