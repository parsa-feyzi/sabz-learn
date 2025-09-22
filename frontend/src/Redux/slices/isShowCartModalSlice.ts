import { createSlice } from "@reduxjs/toolkit";

const isShowCartModalSlice = createSlice({
  name: "isShowCartModal",
  initialState: { isShow: false },
  reducers: {
    showCartModalTagle: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const { showCartModalTagle } = isShowCartModalSlice.actions

export default isShowCartModalSlice.reducer