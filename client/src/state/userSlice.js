import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    userData: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("profile");
      state.isSignedIn = false;
      state.userData = null;
    },
    login(state, action) {
      localStorage.setItem("profile", action.payload);
      state.isSignedIn = true;
      state.userData = action.payload;
    },
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
