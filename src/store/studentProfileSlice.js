import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: false,
	studentProfileData: null,
};

const studentProfileSlice = createSlice({
	name: "studentProfile",
	initialState,
	reducers: {
		pushStudentProfile: (state, action) => {
			state.status = true;
			state.studentProfileData = action.payload;
		},
		clearStudentProfile: (state) => {
			state.status = false;
			state.studentProfileData = null;
		},
	},
});

export const { pushStudentProfile, fetchStudentProfile } =
	studentProfileSlice.actions;

export default studentProfileSlice.reducer;
