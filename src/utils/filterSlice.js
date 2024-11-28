import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
    sort: "",
  },
  reducers: {
    ascending: (state, action) => {
      state.sort = action.payload;
    },
    descending: (state, action) => {
      state.sort = action.payload;
    },
    updateStock: (state) => {
      state.byStock = !state.byStock;
    },
    updateFastDelivery: (state) => {
      state.byFastDelivery = !state.byFastDelivery;
    },
    filterByRating: (state, action) => {
      state.byRating = action.payload;
    },
    filterBySearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearFilter: (state) => {
      state.byStock = false;
      state.byFastDelivery = false;
      state.byRating = 0;
      state.searchQuery = "";
      state.sort = "";
    },
  },
});

export const {
  ascending,
  descending,
  updateStock,
  updateFastDelivery,
  filterByRating,
  filterBySearch,
  clearFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
