import { useCallback } from "react";

import {
  Description,
  ErrorCardWrapper,
  RefreshButton,
  Title,
} from "./ErrorBoundary.sc";

export const ErrorBoundaryCard: React.FC = () => {
  const handleClick = useCallback(() => {
    window.location.reload();
  }, []);
  return (
    <ErrorCardWrapper>
      <Title>Unknown error</Title>
      <Description>Something went wrong. Please try again later.</Description>
      <RefreshButton onClick={handleClick}>{"Refresh"}</RefreshButton>
    </ErrorCardWrapper>
  );
};
