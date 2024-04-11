import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./state/slice.js";

export default configureStore({
  reducer: { testReducer },
});
