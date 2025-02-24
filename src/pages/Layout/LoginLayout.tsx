import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "_state/useSelector";

export const LoginLayout: React.FC = () => {
  const isUserLoggedIn = useSelector(({ user }) => user.isUserLoggedIn);
  return <>{!isUserLoggedIn ? <Outlet /> : <Navigate to={"/"} />}</>;
};
