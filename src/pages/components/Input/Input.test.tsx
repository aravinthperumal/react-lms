import { fireEvent, render, screen } from "utils/test-utils";
import Input from "./Input";

describe("Input", () => {
  const mockOnChange = jest.fn();

  test("renders the input component", () => {
    render(<Input value="" name="input" onChange={mockOnChange} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("test with value", () => {
    render(<Input value="test" name="input" onChange={mockOnChange} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("test");
  });

  test("handle onChange event", () => {
    render(<Input value="" name="input" onChange={mockOnChange} />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test value" } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
