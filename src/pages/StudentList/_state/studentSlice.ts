import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "globals/server";
import { Student, StudentState } from "./types";
import { RootState } from "_state/store";

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

export const borrowBook = createAsyncThunk(
  "students/updateBooks",
  async (
    {
      studentId,
      bookId,
    }: {
      studentId: string;
      bookId: string;
    },
    { dispatch, getState },
  ) => {
    const state = getState() as RootState;
    const studentList = state.student.studentList;

    const student = studentList.find((s) => s.id === studentId);
    if (!student) throw new Error("Student not found");

    const updatedStudent = {
      ...student,
      booksBorrowed: [...student.booksBorrowed, bookId],
    };

    await dispatch(updateStudent(updatedStudent));

    return studentList.map((s) => (s.id === studentId ? updatedStudent : s));
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
    builder.addCase(borrowBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studentList = action.payload;
    });
  },
});

export const student = studentSlice.reducer;
