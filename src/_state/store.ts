import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { book } from "pages/bookList/_state/bookSlice";
import { user } from "pages/login/_state/userSlice";
import { student } from "pages/studentList/_state/studentSlice";

const rootREducer = combineReducers({
  user,
  student,
  book,
});
export const store = configureStore({
  reducer: rootREducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
