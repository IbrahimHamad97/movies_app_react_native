import userReducer from "./user/userReducer";
import { configureStore } from "@reduxjs/toolkit";

export const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});
