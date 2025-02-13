import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./NavBar";
import { render, screen } from "@testing-library/react";

describe("NavBar", () => {
  it("render the navbar correctly", () => {
    render(<NavBar />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText("Library Management")).toBeInTheDocument();
    expect(screen.getByText("Student List")).toBeInTheDocument();
    expect(screen.getByText("Book List")).toBeInTheDocument();
    expect(screen.getByText("Book Taken Entry")).toBeInTheDocument();
    expect(screen.getByText("Book Return Entry")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
