const mongoose = require("mongoose")
const DeliverySchema = mongoose.Schema({
   user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    cart: {
        type :mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Cart"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cart",
        required: true

    },
    qunatity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true,
        
    },
    discountPrice:{
        type:Number,
        required:true,
        
    },

})
module.exports = mongoose.model("CartIteam",DeliverySchema)