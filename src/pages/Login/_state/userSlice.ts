import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCALSTORAGE_USER } from "globals/constants";
import { getFromLocalStorage } from "utils/localStorage/localStorage";
import { User } from "utils/types";

interface LoginState {
  isUserLoggedIn: boolean;
  user: User;
}
const initialState: LoginState = {
  isUserLoggedIn: Boolean(getFromLocalStorage(LOCALSTORAGE_USER)), //to update persisted data even in the page reload
  user: getFromLocalStorage<User>(LOCALSTORAGE_USER) ?? ({} as User),
};

const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.isUserLoggedIn = true;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.isUserLoggedIn = false;
      state.user = {} as User;
    },
  },
});

export const user = userSlice.reducer;
export const { logOut, login } = userSlice.actions;
