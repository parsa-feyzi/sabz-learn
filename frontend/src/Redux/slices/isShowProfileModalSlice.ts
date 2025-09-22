import { createSlice } from "@reduxjs/toolkit";

const isShowProfileModalSlice = createSlice({
  name: "isShowProfileModal",
  initialState: { isShow: false },
  reducers: {
    showProfileModalTagle: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const { showProfileModalTagle } = isShowProfileModalSlice.actions

export default isShowProfileModalSlice.reducer