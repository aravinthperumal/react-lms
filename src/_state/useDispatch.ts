import { AppDispatch } from "./store";
import { useDispatch as useReduxDispatch } from "react-redux";
export const useDispatch = useReduxDispatch.withTypes<AppDispatch>();
