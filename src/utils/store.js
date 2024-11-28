import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    products: productReducer,
  },
});
