import Button from "./Button";
import { fireEvent, renderWithProviders, screen } from "utils/test-utils";

describe("Button", () => {
  it("render the button with the text", () => {
    renderWithProviders(<Button>{"Click Me"}</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("apply disabled props to the button", () => {
    renderWithProviders(<Button disabled>{"Click Me"}</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeDisabled();
  });

  it("check onClick event when clicked", () => {
    const handleClick = jest.fn();
    renderWithProviders(<Button onClick={handleClick}>{"Click Me"}</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
