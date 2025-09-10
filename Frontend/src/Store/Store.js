import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../Slices/Auth/Registration";
import authLogin from "../Slices/Auth/Login";

export const store = configureStore({
  reducer: {
    Registration: authReducer,
    Login : authLogin
  },
});
