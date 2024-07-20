const express = require("express");
const bodyParser = require("body-parser");
var stripe = require("../helper/Stripe");
const router = express.Router();
var AddressModel = require("../Models/Delivery-Model");
var OrderModel = require("../Models/Order-Models");
var myOrders = require("../Models/My-Orders");
var Protected = require("../MiddleWares/Protected");
const handleOrderData = async (
  productId,
  orderData,
  customer_details,
  userId,
  paymentMethod
) => {
  //MY ORDERS
  console.log("productId", productId);
  console.log("orderdata", orderData);
  console.log("customer_details", customer_details);
  console.log("userid", userId);
  console.log("payment", paymentMethod);
  let address = await new AddressModel({
    fullName: customer_details.name,
    email: customer_details.email,
    Address: customer_details.address,
    PhoneNumber: customer_details.phone,
    city: customer_details.address.city,
    country: customer_details.address.country,
    line1: customer_details.address.line1,
    line2: customer_details.address.line2,
    postal_code: customer_details.address.postal_code,
  });
  await address.save();

  let totalPrice = orderData.reduce((sum, product) => sum + product.price, 0);

  let order = await new OrderModel({
    orderData: orderData,
    deliveryAddrss: address._id,
    paymentMethod: paymentMethod,
    paymentStatus: "Paid",
    quantity: orderData.length,
    totalPrice: totalPrice,
  });

  await order.save();

  let myOrder = await new myOrders({
    orderData: orderData,
    userId: userId,
    adminOrderId: order._id,
    productId: productId,
  });
  await myOrder.save();
};
const endpointSecret =
  "whsec_67fe5fade4fbc124b85dac7c61bc5f963dc85564c311f3a09ec73032a00ad6c8";

router.use(bodyParser.json());

router.post("/webhook", async (request, response) => {
  let orderData = [];

  var playloadString = JSON.stringify(request.body);
  var headers = stripe.webhooks.generateTestHeaderString({
    payload: playloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      playloadString,
      headers,
      endpointSecret
    );
  } catch (err) {
    console.log("Webhook Error:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  //add switch
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const { customer_details, metadata } = session;

      const productData = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      for (const item of productData.data) {
        // Fetch product details to get metadata
        let totalprice = item.amount_total / 100;
        const product = await stripe.products.retrieve(item.price.product);

        orderData.push({
          ...product.metadata,
          name: item.description,
          price: totalprice,
        });
        handleOrderData(
          product?.metadata?.productId,
          orderData,

          customer_details,
          metadata.userId,
          session.payment_method_types[0]
        );
      }

      response.status(200).json({ message: "Order Placed Successfully" });

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return response.status(200).send().end();
});

router.use(express.json());
module.exports = router;
