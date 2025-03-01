import { NavBar } from "pages/components/navBar/NavBar";
import { ErrorBoundaryCard } from "pages/errorPage/ErrorBoundary/ErrorBoundaryCard";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router";

import { StyledBasePageLayout } from "./BasePageLayout.sc";

export const BasePageLayout: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <NavBar />
      {/* added key for error boundary so on every new page error will be reset*/}
      <ErrorBoundary key={location.pathname} fallback={<ErrorBoundaryCard />}>
        <StyledBasePageLayout>
          <Outlet />
        </StyledBasePageLayout>
      </ErrorBoundary>
    </>
  );
};
