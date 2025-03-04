import { renderWithProviders, screen } from "utils/test-utils";

import { BookReturnEntry } from "./BookReturnEntry";

describe("Book Return Entry", () => {
  it("render with correct header text and input elements", () => {
    renderWithProviders(<BookReturnEntry />);

    expect(screen.getByText(/Book Return Entry/i)).toBeInTheDocument();
  });
});
