var express = require("express");
var router = express.Router();
var upload = require("../helper/cloudinary");
var {
  getAllProducts,
  createProduct,
  GetCategoryProduct,
  GetProductAndDelete,
  GetProductAndUpdate,
  deleteImages,
  UserReviews,
  fetchingReviews,
} = require("../Controller/Product");
const Protected = require("../MiddleWares/Protected");
const ProductDataModel = require("../Models/ProductData-Model");
/* GET users listing. */
router.post("/:categoryname/:sectionname/:itemsname", GetCategoryProduct);
router.post("/update/:id", upload.array("images", 10), GetProductAndUpdate);
// router.delete("/delete/:id", GetProductAndDelete);
router.get("/all", getAllProducts);
router.post("/create", Protected, upload.array("images", 10), createProduct);
// router.put("/ratting/:id", UserReviews);
router.post("/delete/:id", GetProductAndDelete);
router.post("/delete", deleteImages);
router.post("/reviews/:id", UserReviews);
router.post("/getreview/:id", fetchingReviews);

router.get("/products", async (req, res) => {
  try {
    const products = await ProductDataModel.find().sort({
      Categoryname: 1, // Sort by Categoryname in ascending order
      sections: 1, // Then by sections
      item: 1, // Then by item
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
