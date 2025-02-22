import { NavBar } from "./NavBar";
import { renderWithProviders, screen } from "utils/test-utils";

describe("NavBar", () => {
  it("render the navbar correctly", () => {
    renderWithProviders(<NavBar />);
    expect(screen.getByText("Library Management")).toBeInTheDocument();
    expect(screen.getByText("Student List")).toBeInTheDocument();
    expect(screen.getByText("Book List")).toBeInTheDocument();
    expect(screen.getByText("Book Taken Entry")).toBeInTheDocument();
    expect(screen.getByText("Book Return Entry")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
