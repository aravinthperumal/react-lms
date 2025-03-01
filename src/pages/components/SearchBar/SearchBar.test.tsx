import { fireEvent, renderWithProviders, screen } from "utils/test-utils";

import SearchBar from "./SearchBar";

describe("Search bar", () => {
  const filters = [{ key: "name", placeholder: "Search by name" }];

  beforeEach(() => {
    renderWithProviders(<SearchBar filters={filters} />);
  });

  it.skip("Should render search bar based on filters", () => {
    filters.forEach((filter) => {
      const filterInput = screen.getByPlaceholderText(filter.placeholder);
      expect(filterInput).toBeInTheDocument();
    });
  });

  it.skip("Should update filter search value based on user input", () => {
    const nameInput = screen.getByPlaceholderText("Search by name");

    fireEvent.change(nameInput, { target: { value: "test" } });

    expect(nameInput).toHaveDisplayValue("test");
  });

  it("calls handleSearch on Search button click", async () => {
    const nameInput = screen.getByPlaceholderText("Search by name");

    fireEvent.change(nameInput, { target: { value: "test" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);
  });
});
