import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Student, StudentState } from "./types";
import axios from "axios";
import { baseURL } from "globals/server";

const initialState: StudentState = {
  studentList: [],
  isLoading: false,
};

export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  const response = await axios.get<Student[]>(`${baseURL}/students`);
  return response.data;
});

const studentSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studentList = action.payload;
    });
  },
});

export const student = studentSlice.reducer;
