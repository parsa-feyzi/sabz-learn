import { createSlice } from "@reduxjs/toolkit";

type themType = 'light' | 'dark'

let localThem: themType = 'light'

if(localStorage.getItem("themPage")) {
  localThem = (localStorage.getItem("themPage") as themType)
}

const themSlice = createSlice({
  name: "themPage",
  initialState: { them: localThem },
  reducers: {
    switchThem: (state) => {
      let mainThem;
      const root = document.documentElement
      console.log(root);
      // if(root.classList.contains("dark")){
      //   root.classList.remove('dark')
      //   root.classList.add('light')
      // } else {
      //   root.classList.remove('light')
      //   root.classList.add('dark')
      // }
      state.them === "light" ? (mainThem = "dark") : (mainThem = "light");
      localStorage.setItem("themPage", mainThem);
      let localThem = localStorage.getItem("themPage");
      state.them = localThem as themType
    },
  },
});

export const { switchThem } = themSlice.actions;

export default themSlice.reducer;
