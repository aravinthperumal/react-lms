import { fireEvent, renderWithProviders, screen } from "utils/test-utils";
import Input from "./Input";

describe("Input", () => {
  const mockOnChange = jest.fn();

  it("renders the input component", () => {
    renderWithProviders(
      <Input value="" name="input" onChange={mockOnChange} />,
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("test with value", () => {
    renderWithProviders(
      <Input value="test" name="input" onChange={mockOnChange} />,
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("test");
  });

  it("handle onChange event", () => {
    renderWithProviders(
      <Input value="" name="input" onChange={mockOnChange} />,
    );
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test value" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("test with error message", () => {
    renderWithProviders(
      <Input
        value="test"
        errorMessage="test error"
        name="input"
        onChange={mockOnChange}
      />,
    );
    const errorText = screen.getByText(/test error/i);
    expect(errorText).toBeInTheDocument();
  });
});
