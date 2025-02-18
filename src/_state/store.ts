import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { user } from "pages/login/_state/userSlice";

const rootREducer = combineReducers({
  user,
});
export const store = configureStore({
  reducer: rootREducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
