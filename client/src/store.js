import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./state/testSlice.js";
import userReducer from "./state/userSlice.js";

export default configureStore({
  reducer: { testReducer, userReducer },
});
