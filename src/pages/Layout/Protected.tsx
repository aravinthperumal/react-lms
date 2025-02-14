import { LOCALSTORAGE_USER_ROLE } from "globals/constants";
import { BasePageLayout } from "./BasePageLayout";
import { Navigate } from "react-router";

export const Protected: React.FC = () => {
  const user = localStorage.getItem(LOCALSTORAGE_USER_ROLE);
  return <>{user ? <BasePageLayout /> : <Navigate to={"/login"} />}</>;
};
