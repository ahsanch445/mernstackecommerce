const Cart = require("../Models/Cart-Model")

async function CreateCart(user) {
    try {
        const cart = await new Cart({ user: user })
        await cart.save()
        return cart
    } catch (error) {
        res.status(400).json({ message: error })
    }
}



const findCartAndUpdate = async (userId) => {
 try {
    
    const cart = findOne({ user: userId })
    const cartItems = find({ cart: cart._id })
    cart.cartItems = cartItems;
    let totalPrice = 0
    let totalDiscount = 0
    let totalIteams = 0
    for (let cartItem of cart.cartItems) {
        totalPrice += cartItem.price;
        totalDiscount += cartItem.discountPrice;
        totalIteams += cartItem.qunatity

    }
    cart.totlePrice = totalPrice //- totalDiscount;
    cart.totleItems =totalIteams
    cart.toltleDiscountPrice  = totalDiscount
    return cart

 } catch (error) {
    res.status(400).json({message:error})
 }



}
module.exports = {
    CreateCart,
    findCartAndUpdate
}