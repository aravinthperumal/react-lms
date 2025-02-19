/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "_state/store";

const AllTheProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react"; // Export everything from @testing-library/react
export { customRender as render };
