import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "globals/server";
import { updateBookCopies } from "pages/bookList/_state/bookSlice";
import { borrowBook } from "pages/studentList/_state/studentSlice";

import { BootTransaction, BootTransactionState } from "./types";

const initialState: BootTransactionState = {
  transaction: [],
  isLoading: false,
};

export const issueBook = createAsyncThunk(
  "bookTransaction/takenEntry",
  async (data: Omit<BootTransaction, "id">, { dispatch }) => {
    const response = await axios.post<BootTransaction>(
      `${baseURL}/transactions`,
      data,
    );
    await dispatch(
      borrowBook({
        bookId: data.bookId,
        studentId: data.studentId,
      }),
    );
    await dispatch(updateBookCopies({ bookId: data.bookId, change: -1 }));
    return response.data;
  },
);

export const fetchBookTransaction = createAsyncThunk(
  "books/fetchAll",
  async (params: Record<string, string>) => {
    const response = await axios.get<BootTransaction[]>(
      `${baseURL}/transactions`,
      {
        params,
      },
    );
    return response.data;
  },
);

const bookTransactionSlice = createSlice({
  initialState,
  name: "bookTransactionSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(issueBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(issueBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transaction.push(action.payload);
      });
    builder
      .addCase(fetchBookTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transaction = action.payload;
      });
  },
});

export const bookTransaction = bookTransactionSlice.reducer;
