import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import basketSlice from "../slices/basketSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    basketItem: basketSlice,
  },
});

export default store;
