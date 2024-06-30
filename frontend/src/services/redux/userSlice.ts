import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userSliceType } from "../../types/types";

const initialState: userSliceType = {
  id: "",
  email: "",
  isLogin: false,
  accessToken: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //user details
    setUserData: (
      state,
      action: PayloadAction<{ id: string; email: string; accessToken: string }>,
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },

    //user logged
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },

    //access tokens
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUserData, login, logout, updateAccessToken } =
  userSlice.actions;

export default userSlice.reducer;
