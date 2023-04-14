import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
    },
  },
  reducers: {
    InitUser: (state, action) => {
      state.login.currentUser = action.payload;
    },
    loginUser: (state, action) => {
      state.login.currentUser = action.payload;
    },
    logoutSuccess: (state) => {
      state.login.currentUser = null;
      if (localStorage.getItem("user_Id")) {
        localStorage.removeItem("user_Id");
      }
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { loginUser, logoutSuccess, InitUser } = authSlice.actions;

export default authSlice.reducer;
