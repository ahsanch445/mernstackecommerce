const CategoryModel = require("../Models/Category-Model");
const ProductDataModel = require("../Models/ProductData-Model");
const User = require("../Models/User-Model");
const Cloudinary = require("../helper/cloudinary");
var rattingModel = require("../Models/Ratting-Model");
const getAllProducts = async (req, res) => {
  try {
    let allProducts = await ProductDataModel.find().sort({ createdAt: -1 });

    res.status(200).json({ message: "all products", allProducts });
  } catch (error) {
    res.status(404).json({ message: "Products Not found" });
  }
};
//delete images from product for update product
const deleteImages = async (req, res) => {
  // delete or upadate imagess

  try {
    if (req.body.url) {
      const product = await ProductDataModel.findById(req.body.id);
      let deldata = product.productimage.filter((e) => {
        return !req.body.url.includes(e);
      });
      let updateproduct = await ProductDataModel.findByIdAndUpdate(
        req.body.id,
        { productimage: deldata },
        { new: true }
      );
      await updateproduct.save();
      res.json({
        message: "delete images successfully",
        success: true,
        data: updateproduct,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }

  // upadate other product data
};

const createProduct = async (req, res) => {
  let img = req?.files?.map((e) => e.path) || [];

  let {
    productname,
    brandname,
    descripsion,
    price,
    selling_price,
    categoryname,
    sectionname,
    itemsname,
  } = req.body;
  let priceNum = parseFloat(price);
  let selling_priceNum = parseFloat(selling_price);
  try {
    if (priceNum < selling_priceNum) {
      res
        .status(400)
        .json({ message: "Price  must be greater then Selling Price " });
    } else {
      if (priceNum < 0 || selling_priceNum < 0) {
        res
          .status(404)
          .json({ message: "Price and Selling Price must be greater then 0 " });
      } else {
        if (
          (!productname ||
            !brandname ||
            !categoryname ||
            img == [] ||
            !price ||
            !selling_price,
          !sectionname,
          !itemsname)
        ) {
          res.status(404).json({ message: "All Fields Are Required" });
        } else {
          try {
            let discountParacentage;
            if (selling_priceNum && priceNum) {
              const discountPrice = priceNum - selling_priceNum;
              discountParacentage = (discountPrice / priceNum) * 100;
            }
            const product = await ProductDataModel.create({
              productname: productname,
              brandname: brandname,
              descripsion: descripsion,
              Categoryname: categoryname,
              productimage: img,
              price: priceNum,
              selling_price: selling_priceNum,
              discountParacentage: discountParacentage,
              sections: sectionname,
              item: itemsname,
            });
            await product.save();
            res.json({ success: true, message: "Product Added Successfully" });
          } catch (error) {
            res.status(500).json(error);
          }
        }
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
  // try {
  //   if (data.includes(req.body.productCategory)) {
  //     const product = await new ProductDataModel({
  //       image: req.body.image,
  //       brand: req.body.brand,
  //       title: req.body.title,
  //       color: req.body.color,
  //       selling_price: req.body.selling_price,
  //       price: req.body.price,
  //       discountPrice: req.body.disscount,
  //       size: req.body.size,
  //       quantity: 1,
  //       descripsion: req.body.descripsion,
  //       // category: category,
  //       isFeatured: req.body.isFeatured,
  //       productCategory: req.body.productCategory,
  //       productSubCategory: req.body.productSubCategory,
  //     });
  //     await product.save();
  //     return res.status(200).json({ message: "Product is added successfully" });
  //   } else {
  //     return res
  //       .status(200)
  //       .json({ message: "product Category does'not match" });
  //   }
  // } catch (error) {
  // res.status(500).json(error.message);
};

const GetCategoryProduct = async (req, res) => {
  try {
    const categoryname = req.params.categoryname;
    let sectionname = req.params.sectionname;
    let itemsname = req.params.itemsname;

    const product = await ProductDataModel.find({
      Categoryname: categoryname,
      sections: sectionname,
      item: itemsname,
    });

    return res.json({ message: "Product", product });
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetProductAndUpdate = async (req, res) => {
  let productId = req.params.id;

  const existingProduct = await ProductDataModel.findById(productId);

  let newImages = req?.files?.map((e) => e.path) || [];

  const {
    productname,
    sectionname,
    itemsname,
    brandname,
    categoryname,
    descripsion,
    price,
    selling_price,
    average,
  } = req.body;
  let priceNum = parseFloat(price);
  let selling_priceNum = parseFloat(selling_price);
  try {
    if (priceNum < selling_priceNum) {
      res
        .status(400)
        .json({ message: "Price  must be greater then Selling Price " });
    } else {
      if (
        descripsion != existingProduct.descripsion ||
        productname != existingProduct.productname ||
        brandname != existingProduct.brandname ||
        categoryname !== existingProduct.categoryname ||
        price != existingProduct.price ||
        selling_price != existingProduct.selling_price ||
        newImages.length != 0
      ) {
        const updatedImages = [...existingProduct.productimage, ...newImages];
        const discount = price - selling_price;
        const discountParacentage = (discount / price) * 100;
        // Update the product with the combined images
        existingProduct.productname = productname;
        existingProduct.brandname = brandname;
        existingProduct.categoryname = categoryname;
        existingProduct.descripsion = descripsion;
        existingProduct.price = price;

        existingProduct.selling_price = selling_price;
        existingProduct.productimage = updatedImages;
        (existingProduct.sections = sectionname),
          (existingProduct.item = itemsname);
        existingProduct.discountParacentage = discountParacentage;
        await existingProduct.save();
        console.log("Product updated successfully");
        return res.status(200).json({
          success: true,
          message: "Product updated successfully",
          product: existingProduct,
        });
      } else {
        res.status(400).json({
          message: " Please change the data which you want to update",
        });
      }
    }
    // Find the existing product

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Combine existing images with new images
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const GetProductAndDelete = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await ProductDataModel.findByIdAndDelete(productId);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const UserReviews = async (req, res) => {
  let { rattng, reviews, userId } = req.body;
  try {
    let ratting = await rattingModel.create({
      userId: userId,
      review: reviews,
      rating: rattng,
      productId: req.params.id,
    });
    await ratting.save();
    let ratting2 = await rattingModel
      .find({ productId: req.params.id })
      .populate("userId");
    let totalRates = ratting2.reduce((sum, cur) => sum + cur.rating, 0);
    let average = totalRates / ratting2.length;
    if (average) {
      let ratting = Math.floor(average);

      let product = await ProductDataModel.findByIdAndUpdate(
        req.params.id,
        {
          ratting: ratting,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Average is updated successfully", product });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchingReviews = async (req, res) => {
  // Ensure page and limit are retrieved from request query with defaults
  let page = parseInt(req.body.page) || 1;
  let limit = parseInt(req.body.limit) || 10;
  if (page == 1) {
    limit = 1;
  } else {
    limit = limit;
  }

  try {
    const skip = page === 1 ? 0 : 1 + (page - 2) * limit;
    // Fetch the ratings for the specific product
    let ratting = await rattingModel
      .find({ productId: req.params.id })
      .populate("userId")
      .skip(skip)
      .limit(limit);

    // Count total number of ratings for the product
    const totalItems = await rattingModel.countDocuments({
      productId: req.params.id,
    });

    // Return response with fetched ratings, total pages and current page
    res.json({
      ratting,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    });
  } catch (error) {
    // Log the error and send a 500 status with the error message
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};
module.exports = {
  getAllProducts,
  createProduct,
  GetCategoryProduct,
  GetProductAndUpdate,
  GetProductAndDelete,
  UserReviews,
  deleteImages,
  fetchingReviews,
};
