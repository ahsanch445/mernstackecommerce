const stripe = require("stripe")(
  "sk_test_51PWx9YCdwAPgZ0JngOazR8JDeFtKHnwDiva2ZnUhEGw4r5dfevyVMgU5Crcph18vUIiATSTAW1fIZG4oLNBIScUM006INJNogn"
);
const myOrders = require("../Models/Order-Models");
const Order = require("../Models/OrderItem-Model"); // Make sure to import your Order model
var AddressModel = require("../Models/Delivery-Model");
const handleStripe = async (req, res) => {
  const conversionRate = 290; // Conversion rate from PKR to USD
  let DeliveryAddress = req.body.AddressData;
  if (!req.body.AddressData) {
    return res.status(404).json({ message: "Address is required" });
  }
  const line_items = req.body?.Cart?.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productname,
        description: item.descripsion ? item.descripsion : "description",
        images: item.productimage ? [item.productimage[0]] : [],
        metadata: {
          brand: item.brandname,
          size: item.productSize,
          userId: req.body.userId,
        },
      },
      unit_amount: Math.round((item.selling_price / conversionRate) * 100),
    },
    quantity: item.productQuantity,
  }));

  try {
    if (!line_items || line_items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const totalPrice = line_items.reduce(
      (total, item) => total + item.price_data.unit_amount * item.quantity,
      0
    );

    //ADD DELIVERY ADDRESS

    let devliery = await AddressModel.create({
      FirstName: DeliveryAddress.FirstName,
      LastName: DeliveryAddress.LastName,
      Address: DeliveryAddress.Address,
      Zip: DeliveryAddress.Zip,
      State: DeliveryAddress.State,
      PhoneNumber: DeliveryAddress.PhoneNumber,
      User: req.body.userId,
    });
    await devliery.save();
    // Prepare the items array for the Order schema
    const items = req.body.Cart.map((item) => ({
      productName: item.productname,
      description: item.descripsion ? item.descripsion : "description",
      images: item.productimage ? [item.productimage[0]] : [],
      brandName: item.brandname,
      productSize: item.productSize,
      sellingPrice: item.selling_price,
      productQuantity: item.productQuantity,
      userId: req.body.userId,
    }));
    //my order controller
    try {
      const productData = {
        ...req.body,
        userId: req.body.userId,
      };

      const newProduct = new myOrders(productData);
      await newProduct.save();

      res
        .status(201)
        .json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to add product", error: error.message });
    }
    // Create a new order with pending status
    const order = new Order({
      items: items,
      totalPrice: totalPrice,
      stripeSessionId: "", // Will be updated after session creation
      paymentStatus: "paid",
      userId: req.body.userId,
      orderAddress: devliery._id, // Assuming userId is passed in the request body
    });

    // Save the order to get an ID
    await order.save();

    const session = await stripe.checkout.sessions.create({
      phone_number_collection: {
        enabled: true,
      },
      line_items: line_items,
      mode: "payment",
      success_url: `http://localhost:5173/account/myorder`, // Pass order ID to success URL
      cancel_url: "http://localhost:3000/check/fail",
    });

    // Update the order with the Stripe session ID
    order.stripeSessionId = session.id;
    await order.save();

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleStripe;
