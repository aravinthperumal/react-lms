import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { book } from "pages/bookList/_state/bookSlice";
import { user } from "pages/login/_state/userSlice";
import { student } from "pages/studentList/_state/studentSlice";

const rootReducer = combineReducers({
  user,
  student,
  book,
});
export const store = configureStore({
  reducer: rootReducer,
});

//store setup for testing https://redux.js.org/usage/writing-tests
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
