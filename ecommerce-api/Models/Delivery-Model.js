const mongoose = require("mongoose")
const DeliverySchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    zip:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
module.exports = mongoose.model("DeliveryAddres",DeliverySchema)