import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCALSTORAGE_USER_ROLE } from "globals/constants";
import { User } from "utils/types";

interface InitialState {
  user: User;
  isUserLoggedIn: boolean;
}
const initialState: InitialState = {
  user: {} as User,
  isUserLoggedIn:
    localStorage.getItem(LOCALSTORAGE_USER_ROLE) !== null || false,
};

const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setIsUserLoggedIn: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isUserLoggedIn: action.payload,
    }),
  },
});

export const user = userSlice.reducer;
export const { setIsUserLoggedIn } = userSlice.actions;
