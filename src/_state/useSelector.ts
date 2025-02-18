import { useSelector as useReduxSelector } from "react-redux";
import { RootState } from "./store";
export const useSelector = useReduxSelector.withTypes<RootState>();
