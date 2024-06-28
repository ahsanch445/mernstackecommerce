const mongoose = require("mongoose")
const DeliverySchema = mongoose.Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    size: {
        type :String
    },
  qunatity: {
        type: Number,
        required: true

    },
    price:{
        type:Number,
        required:true,
        
    },
    totlePrice:{
        type:Number,
        required:true,
        
    },
    discountPrice:{
        type:Number,
        required:true,
        
    }

})
module.exports = mongoose.model("CartIteam",DeliverySchema)