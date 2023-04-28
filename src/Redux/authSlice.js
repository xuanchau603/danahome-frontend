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
    editUser: (state, action) => {
      const { access_Token } = state.login.currentUser;
      state.login.currentUser = { ...action.payload, access_Token };
    },
  },
});

export const { loginUser, logoutSuccess, InitUser, editUser } =
  authSlice.actions;

export default authSlice.reducer;
