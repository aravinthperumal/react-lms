import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book, BookState } from "./types";
import { baseURL } from "globals/server";

const initialState: BookState = {
  bookList: [],
  isLoading: false,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchAll",
  async (params: Record<string, string>) => {
    const response = await axios.get<Book[]>(`${baseURL}/books`, { params });
    return response.data;
  },
);

const bookSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookList = action.payload;
    });
  },
});

export const book = bookSlice.reducer;
