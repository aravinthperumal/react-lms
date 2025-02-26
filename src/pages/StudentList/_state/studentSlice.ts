import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "globals/server";
import { Student, StudentState } from "./types";

const initialState: StudentState = {
  studentList: [],
  isLoading: false,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async (params: Record<string, string>) => {
    const response = await axios.get<Student[]>(`${baseURL}/students`, {
      params,
    });
    return response.data;
  },
);

export const addStudent = createAsyncThunk(
  "students/add",
  async (studentData: Omit<Student, "id">) => {
    const response = await axios.post<Student>(
      `${baseURL}/students`,
      studentData,
    );
    return response.data;
  },
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async (studentData: Student) => {
    const response = await axios.put<Student>(
      `${baseURL}/students/${studentData.id}`,
      studentData,
    );
    return response.data;
  },
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (studentId: string) => {
    await axios.delete(`${baseURL}/students/${studentId}`);
    return studentId;
  },
);

const studentSlice = createSlice({
  initialState,
  name: "studentSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentList = action.payload;
      });
    builder
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentList.push(action.payload);
      });
    builder
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.studentList.findIndex(
          (student) => student.id === action.payload.id,
        );
        if (index !== -1) {
          state.studentList[index] = action.payload;
        }
      });
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentList = state.studentList.filter(
          (student) => student.id !== action.payload,
        );
      });
  },
});

export const student = studentSlice.reducer;
