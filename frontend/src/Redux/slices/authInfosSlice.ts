import { createSlice } from "@reduxjs/toolkit";
import type { T_userInfos } from "../../Types/type";
import type { I_AuthInfos } from "../../Types/interface";

type T_loginAction = { payload: { token: string; user: T_userInfos } };

const values: I_AuthInfos = {
  isLogin: false,
  token: null,
  userInfos: null,
};

const authInfosSlice = createSlice({
  name: "authInfos",
  initialState: { values },
  reducers: {
    register: (state, action: T_loginAction) => {
      state.values.token = action.payload.token;
      state.values.userInfos = action.payload.user;
      localStorage.setItem("user", JSON.stringify({ token: action.payload.token }));
    },
    login: (state, action: T_loginAction) => {
      state.values.token = action.payload.token;
      state.values.userInfos = action.payload.user;
      state.values.isLogin = true
      localStorage.setItem("user", JSON.stringify({ token: action.payload.token }));
    },
    logout: (state) => {
      state.values.token = null;
      state.values.userInfos = null;
      state.values.isLogin = false
      localStorage.removeItem("user")
    },
  },
});

export const { register, login, logout } = authInfosSlice.actions;

export default authInfosSlice.reducer;
