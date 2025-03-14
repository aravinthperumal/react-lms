import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { LOCALSTORAGE_USER, USER_DATA_ERROR } from 'globals/constants';
import { baseURL } from 'globals/server';

import { getFromLocalStorage } from 'utils/localStorage/localStorage';
import { User } from 'utils/types';

interface LoginState {
    isUserLoggedIn: boolean;
    user: User;
    isLoading: boolean;
    error: string | null;
}
const initialState: LoginState = {
    isUserLoggedIn: Boolean(getFromLocalStorage(LOCALSTORAGE_USER)), //to update persisted data even in the page reload
    user: getFromLocalStorage<User>(LOCALSTORAGE_USER) ?? {},
    isLoading: false,
    error: null,
};

export const updateUser = createAsyncThunk('users/update', async (userData: User, { rejectWithValue }) => {
    try {
        const response = await axios.put<User>(`${baseURL}/users/${userData.id}`, userData);
        return response.data;
    } catch {
        return rejectWithValue(USER_DATA_ERROR);
    }
});

const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        login: (state, action: PayloadAction<{ user: User }>) => {
            state.isUserLoggedIn = true;
            state.user = action.payload.user;
        },
        logOut: (state) => {
            state.isUserLoggedIn = false;
            state.user = {} as User;
        },
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(updateUser.rejected, (state) => {
            state.isLoading = false;
            state.error = USER_DATA_ERROR;
        });
    },
});

export const user = userSlice.reducer;
export const { logOut, login, resetError } = userSlice.actions;
