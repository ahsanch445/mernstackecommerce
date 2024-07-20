import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  addToCart: [],
  isProductDetails: false,
  isSize:null
}

export const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {
    setAddToCart: (state, action) => {
      const {
        isProductDetails,
        product,
        isSize
      } = action.payload;

      const existingProduct = state.addToCart.find(item => item?._id === product?._id);
      if (existingProduct) {
        if (!isProductDetails) {
          existingProduct.productQuantity += product?.productQuantity;
        }
      } else {
        state.addToCart.push({
          ...product,
          productSize: isSize, 
          isProductDetails: isProductDetails ? isProductDetails : false
        });
      }
    },
    setSize: (state, action) => {
      const { isSize } = action.payload;
   console.log("isSize",isSize)
      state.isSize = isSize
    },
    removeFromCart: (state, action) => {
      state.addToCart = state.addToCart.filter(item => item?._id !== action?.payload?._id);
    },
    CartQtn: (state, action) => {
      const { productId, data } = action.payload;
      const product = state.addToCart.find(item => item._id === productId);
      if (product && data > 0) {
        product.productQuantity = data;
      }
    },
  },
})

export const { setAddToCart, removeFromCart, CartQtn ,setSize} = addToCartSlice.actions

export default addToCartSlice.reducer
