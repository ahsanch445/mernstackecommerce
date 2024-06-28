const mongoose = require("mongoose")
const DeliverySchema = mongoose.Schema({
   user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    cartItems: {
        type :mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"CartIteam"
    },
    totlePrice: {
        type: Number,
        required: true,
        default:0
    },
    totleItems:{
        type:Number,
        required:true,
        default:0
    },
    toltleDiscountPrice:{
        type:Number,
        required:true,
        default:0
    },
    discount:{
        type:Number,
        required:true,
        default:0
    },

})
module.exports = mongoose.model("Cart",DeliverySchema)