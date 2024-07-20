var express = require("express");
var router = express.Router();
var {
  allCategories,
  createCategories,
  deleteCategory,
  // updateCategory,
  allNavCategories,
  allCategoriesNames,
  addNewData,
  addNewDataItem,
  getAllCategories,
  UpdateCategory,
  findOneCategory,
} = require("../Controller/Category");

/* GET users listing. */
router.post("/addnew", addNewData);
router.post("/addnew2", addNewDataItem);
router.get("/all", allCategories);

router.get("/name", allCategoriesNames);
router.get("/nav/all", allNavCategories);
router.get("/allcategories", getAllCategories);
router.post("/create", createCategories);
router.delete("/delete/:id", deleteCategory);
router.post("/update", UpdateCategory);
router.put("/getCategory/:id", findOneCategory);

module.exports = router;
