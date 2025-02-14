import { NavBar } from "pages/components/navBar/NavBar";
import { Outlet } from "react-router";
import { StyledBasePageLayout } from "./BasePageLayout.sc";

export const BasePageLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <StyledBasePageLayout>
        <Outlet />
      </StyledBasePageLayout>
    </>
  );
};
