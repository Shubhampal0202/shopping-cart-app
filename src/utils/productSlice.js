import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    cartProducts: [],

  },
  reducers: {
    setData: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      state.cartProducts.push({ ...action.payload, quantity: 1 });
    },
    changeQuantity: (state, action) => {
      state.cartProducts = state.cartProducts.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: Number(action.payload.qty) }
          : { ...item };
      });
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setData, addToCart, removeFromCart, changeQuantity } =
  productSlice.actions;
export default productSlice.reducer;
