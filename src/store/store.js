import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import studentProfileSlice, { callReducer, loaderReducer } from "./studentProfileSlice";


const store = configureStore({
	reducer: {
		auth: authReducer,
		studentProfile: studentProfileSlice,
		loader: loaderReducer,
		call : callReducer
	},

});

export default store;
