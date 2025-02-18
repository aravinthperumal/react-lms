import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isUserLoggedIn: boolean;
}
const initialState: InitialState = {
  isUserLoggedIn: false,
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
