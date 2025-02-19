import { fireEvent, render, screen, waitFor } from "utils/test-utils";
import SearchBar from "./SearchBar";

describe("Search bar", () => {
  const mockOnSearch = jest.fn();

  const filters = [{ key: "name", placeholder: "Search by name" }];

  beforeEach(() => {
    render(<SearchBar filters={filters} onSearch={mockOnSearch} />);
  });

  it("Should render search bar based on filters", () => {
    filters.forEach((filter) => {
      const filterInput = screen.getByPlaceholderText(filter.placeholder);
      expect(filterInput).toBeInTheDocument();
    });
  });

  it("Should update filter search value based on user input", () => {
    const nameInput = screen.getByPlaceholderText("Search by name");

    fireEvent.change(nameInput, { target: { value: "test" } });

    expect(nameInput).toHaveDisplayValue("test");
  });

  it("Should call onSearch with filter value", async () => {
    const nameInput = screen.getByPlaceholderText("Search by name");
    fireEvent.change(nameInput, { target: { value: "test" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith({ name: "test" });
    });
  });
});
