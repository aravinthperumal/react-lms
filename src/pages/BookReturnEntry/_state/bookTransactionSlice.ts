import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { MINUS_ONE, NUMBER_ONE } from 'globals/constants';
import { baseURL } from 'globals/server';

import { updateBookCopies } from 'pages/bookList/_state/bookSlice';
import { borrowBook, returnBorrowedBook } from 'pages/studentList/_state/studentSlice';

import { BookTransaction, BookTransactionState } from './types';

const initialState: BookTransactionState = {
    transaction: [],
    isLoading: false,
};

export const issueBook = createAsyncThunk(
    'bookTransaction/takenEntry',
    async (data: Omit<BookTransaction, 'id'>, { dispatch }) => {
        const response = await axios.post<BookTransaction>(`${baseURL}/transactions`, data);
        await dispatch(
            borrowBook({
                bookId: data.bookId,
                studentId: data.studentId,
            }),
        );
        await dispatch(updateBookCopies({ bookId: data.bookId, change: MINUS_ONE }));
        return response.data;
    },
);

export const returnBook = createAsyncThunk(
    'bookTransaction/returnEntry',
    async (data: BookTransaction, { dispatch }) => {
        const response = await axios.put<BookTransaction>(`${baseURL}/transactions/${data.id}`, data);

        await dispatch(
            returnBorrowedBook({
                bookId: data.bookId,
                studentId: data.studentId,
            }),
        );
        await dispatch(updateBookCopies({ bookId: data.bookId, change: NUMBER_ONE })).unwrap();
        return response.data;
    },
);

export const fetchBookTransaction = createAsyncThunk(
    'bookTransaction/fetchAll',
    async (params: Record<string, string>) => {
        const response = await axios.get<BookTransaction[]>(`${baseURL}/transactions`, {
            params,
        });
        return response.data;
    },
);

const bookTransactionSlice = createSlice({
    initialState,
    name: 'bookTransactionSlice',
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
        builder
            .addCase(returnBook.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(returnBook.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.transaction.findIndex((transaction) => transaction.id === action.payload.id);
                if (index !== MINUS_ONE) {
                    state.transaction[index] = action.payload;
                }
            });
    },
});

export const bookTransaction = bookTransactionSlice.reducer;
