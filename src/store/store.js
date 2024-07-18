import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import studentProfileSlice from "./studentProfileSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		studentProfile: studentProfileSlice,
	},
});

export default store;
