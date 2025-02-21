import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCALSTORAGE_USER_ROLE } from "globals/constants";

interface InitialState {
  isUserLoggedIn: boolean;
}
const initialState: InitialState = {
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
