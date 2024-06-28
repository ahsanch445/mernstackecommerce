const mongoose = require("mongoose")
const DeliverySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    orderAddress: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "DeliveryAddres"
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    deliveryDate: {
        type: Date,

    },
    pymentDeatil: {
        paymentMethod: {
            type: String,
        },
        transactionId: {
            type: String
        },
        pymentId: {
            type: String
        },
        pymentStatus: {
            type: String
        }
    },
    toltlePrice: {
        type: Number,
        required: true,

    },
    discountedPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,

    },
    totleItems: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})
module.exports = mongoose.model("Order", DeliverySchema)