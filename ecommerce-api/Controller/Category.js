const CategoryModel = require("../Models/Category-Model");
// const categoryModel = require("../Models/Category-Model");
const ProductDataModel = require("../Models/ProductData-Model");
const allCategories = async (req, res) => {
  try {
    const product = await ProductDataModel.distinct("categoryname");
    let category = [];
    for (const categoryname of product) {
      let data = await ProductDataModel.findOne({ categoryname: categoryname });
      category.push(data);
    }
    return res.status(200).json({ message: "All Categories", category });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const allNavCategories = async (req, res) => {
  try {
    let category = await CategoryModel.find();
    return res.status(200).json({ message: "All Categories", category });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createCategories = async (req, res) => {
  let { Categoryname, section } = req.body;
  let { sectionname, itemsname } = section;

  try {
    if (Categoryname && sectionname && itemsname) {
      const category = await CategoryModel.create({
        Categoryname: Categoryname,
        sections: [
          {
            name: sectionname,
            items: [
              {
                name: itemsname,
              },
            ],
          },
        ],
      });
      await category.save();

      return res.status(200).json({ message: "Category Created Successfully" });
    } else {
      res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const allCategoriesNames = async (req, res) => {
  try {
    let data = await CategoryModel.distinct("Categoryname");
    return res.json({ message: "Categories Names ", data });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const addNewData = async (req, res) => {
  if (!req.body.sectionname) return res.json("section name is required");
  if (!req.body.categoryname || req.body.categoryname == "Select Category") {
    return res.status(400).json({ message: "Category Name is must required" });
  } else {
    try {
      let category = await CategoryModel.findOne({
        Categoryname: req.body.categoryname,
      });
      const sectionExists = category.sections.some(
        (section) => section.name === req.body.sectionname
      );

      if (sectionExists) {
        return res.status(400).json({ message: "Section name already exists" });
      }
      category?.sections?.push({ name: req.body.sectionname });

      await category.save();
      res.status(200).json({ message: "Category Updated Successfully" });
    } catch (error) {
      res.status(500).json(error.message);
      console.log(error.message);
    }
  }
};

const addNewDataItem = async (req, res) => {
  if (!req.body.itemsname) {
    return res.json({ message: "items name is required" });
  }

  if (!req.body.sectionname) return res.json("section name is required");
  if (!req.body.categoryname || req.body.categoryname == "Select Category") {
    return res.status(400).json({ message: "Category Name is must required" });
  } else {
    let category = await CategoryModel.findOne({
      Categoryname: req.body.categoryname,
    });
    let secname = category.sections.filter((el) => {
      return el.name.includes(req.body.sectionname);
    });
    let sectiondata = secname[0].items.some((elem) => {
      return elem.name == req.body.itemsname;
    });
    if (sectiondata) {
      return res.status(400).json({ message: "Items name already exists" });
    }
    try {
      let result = await CategoryModel.updateOne(
        {
          Categoryname: req.body.categoryname,
          "sections.name": req.body.sectionname,
        },
        {
          $push: { "sections.$.items": { name: req.body.itemsname } },
        }
      );

      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ message: "Category or section not found" });
      }

      res.status(200).json({ message: "Item Updated Successfully" });
    } catch (error) {
      res.status(500).json(error.message);
      console.log(error.message);
    }
  }
};

const deleteCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  allCategories,
  createCategories,
  deleteCategory,
  addNewDataItem,
  allNavCategories,
  allCategoriesNames,
  addNewData,
};
