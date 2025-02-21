import { BasePageLayout } from "./BasePageLayout";
import { Navigate } from "react-router";
import { useSelector } from "_state/useSelector";

export const Protected: React.FC = () => {
  const isUserLoggedIn = useSelector(({ user }) => user.isUserLoggedIn);
  //if not authenticated redirect to login page
  return (
    <>{isUserLoggedIn ? <BasePageLayout /> : <Navigate to={"/login"} />}</>
  );
};
