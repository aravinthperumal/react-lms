import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book, BookState } from "./types";
import { baseURL } from "globals/server";

const initialState: BookState = {
  bookList: [],
  isLoading: false,
};

export const addBook = createAsyncThunk(
  "books/add",
  async (bookData: Omit<Book, "id">) => {
    const response = await axios.post<Book>(`${baseURL}/books`, bookData);
    return response.data;
  },
);

export const updateBook = createAsyncThunk(
  "books/update",
  async (bookData: Book) => {
    const response = await axios.put<Book>(
      `${baseURL}/books/${bookData.id}`,
      bookData,
    );
    return response.data;
  },
);

export const fetchBooks = createAsyncThunk(
  "books/fetchAll",
  async (params: Record<string, string>) => {
    const response = await axios.get<Book[]>(`${baseURL}/books`, { params });
    return response.data;
  },
);

export const deleteBook = createAsyncThunk(
  "books/delete",
  async (bookId: string) => {
    await axios.delete(`${baseURL}/books/${bookId}`);
    return bookId;
  },
);

const bookSlice = createSlice({
  initialState,
  name: "bookSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookList = action.payload;
      });
    builder
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookList.push(action.payload);
      });
    builder
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.bookList.findIndex(
          (book) => book.id === action.payload.id,
        );
        if (index !== -1) {
          state.bookList[index] = action.payload;
        }
      });
    builder
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookList = state.bookList.filter(
          (book) => book.id !== action.payload,
        );
      });
  },
});

export const book = bookSlice.reducer;
