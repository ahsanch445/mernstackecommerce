var stripe = require("../helper/Stripe");
const myOrders = require("../Models/Order-Models");
const Order = require("../Models/My-Orders"); // Make sure to import your Order model
var AddressModel = require("../Models/Delivery-Model");
const handleStripe = async (req, res) => {
  // Conversion rate from PKR to USD
  let { myData } = req.body;

  const line_items = req.body?.Cart?.map((item) => ({
    price_data: {
      currency: "pkr",
      product_data: {
        name: item.productname,
        description: item.descripsion ? item.descripsion : "description",
        images: item.productimage ? [item.productimage[0]] : [],
        metadata: {
          productQuantity: item.productQuantity,
          brand: item.brandname,
          productId: item._id || "noting found",
          productSize: myData || "S", // Convert to string
          description: item.descripsion,
          image: item.productimage ? item.productimage[0] : "", // Use first image as string
        },
      },
      unit_amount: item.selling_price * 100,
    },
    quantity: item.productQuantity,
  }));

  try {
    if (!line_items || line_items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const session = await stripe.checkout.sessions.create({
      phone_number_collection: {
        enabled: true,
      },

      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["PK", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "pkr" },
            display_name: "Standard shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      line_items: line_items,
      mode: "payment",
      success_url: `https://frontend-eight-zeta-18.vercel.app/account/myorder`, // Pass order ID to success URL
      cancel_url: "http://localhost:3000/check/fail",
      metadata: {
        userId: req.body.userId,
      },
    });

    // Update the order with the Stripe session ID

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleStripe;
