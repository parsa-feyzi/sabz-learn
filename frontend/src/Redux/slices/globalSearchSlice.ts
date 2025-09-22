import { createSlice } from "@reduxjs/toolkit";
import type { T_InputEvent } from "../../Types/type";

const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState: { infos: { value: "", resulve: {} } },
  reducers: {
    globalSearchHandler: (state, action: { payload: T_InputEvent }) => {
      const inputValue = action.payload.target.value;
      (state.infos.value = inputValue);
    },
  },
});

export const { globalSearchHandler } = globalSearchSlice.actions;

export default globalSearchSlice.reducer;
