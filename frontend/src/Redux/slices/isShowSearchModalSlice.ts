import { createSlice } from "@reduxjs/toolkit";

const isShowSearchModalSlice = createSlice({
  name: "isShowSearchModal",
  initialState: { isShow: false },
  reducers: {
    showSearchModalTagle: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const { showSearchModalTagle } = isShowSearchModalSlice.actions

export default isShowSearchModalSlice.reducer