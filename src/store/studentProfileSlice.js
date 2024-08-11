import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  studentProfileData: null,
  recallCount: 0,
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

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
      //   console.log("Loading" ,state.isLoading);
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

const callSlice = createSlice({
  name: "call",
  initialState: initialState,
  reducers: {
    recallData: (state) => {
      state.recallCount += 1;
	  console.log(state.recallCount)
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export const { pushStudentProfile, fetchStudentProfile } =
  studentProfileSlice.actions;

export default studentProfileSlice.reducer;
export const loaderReducer = loaderSlice.reducer;
export const callReducer = callSlice.reducer;
export const { recallData } = callSlice.actions;
