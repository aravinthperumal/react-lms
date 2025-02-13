import { NavBar } from "pages/components/NavBar/NavBar";
import { Outlet } from "react-router";

export const BasePageLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
