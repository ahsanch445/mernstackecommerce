const Cart = require("../Models/Cart-Model");
const CartItems = require("../Models/CartItems-Model");
const Product = require("../Models/ProductData-Model");
const AddToCart = async (userId, req, res) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId);
    const isCartItems = await CartItems.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isCartItems) {
      const CartIteams = await new CartItems({
        product: product._id,
        cart: cart._id,
        userId,
        price: product.price,
        qunatity: 1,
        discountPrice: product.discountedPrice,
        size: req.size,
      });

      cart.cartItems.push(CartIteams);
      await cart.save();
      return res.status(200).json({ message: "Item is added in Cart" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
