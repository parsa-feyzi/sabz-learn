import { createSlice } from "@reduxjs/toolkit";
import type { T_SingleCourseData } from "../../Types/type";

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: {
    value: {
      cartItems:
        localStorage.getItem("cartItems") &&
        localStorage.getItem("cartItems")?.length
          ? JSON.parse(localStorage.getItem("cartItems") as string)
          : null,
    },
  },
  reducers: {
    addCartItem: (state, action: { payload: T_SingleCourseData }) => {
      if (state.value.cartItems) {
        if (
          !state.value.cartItems.find(
            (course: T_SingleCourseData) => course._id === action.payload._id
          )
        ) {
          localStorage.setItem(
            "cartItems",
            JSON.stringify([...state.value.cartItems, action.payload])
          );
          state.value.cartItems = [...state.value.cartItems, action.payload];
        }
      } else {
        localStorage.setItem("cartItems", JSON.stringify([action.payload]));
        state.value.cartItems = [action.payload];
      }
    },

    removeCartItem: (state, action: { payload: T_SingleCourseData }) => {
      const mainCartItems = state.value.cartItems.filter(
        (course: T_SingleCourseData) => course._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(mainCartItems));
      state.value.cartItems = mainCartItems;
    },

    removeAllCartItems: (state) => {
      state.value.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify([]));
    },
  },
});

export const { addCartItem, removeCartItem, removeAllCartItems } =
  cartItemsSlice.actions;

export default cartItemsSlice.reducer;
