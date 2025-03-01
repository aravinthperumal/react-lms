import { screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "pages/login/Login";
import { fetchUserData } from "utils/api";
import { renderWithProviders } from "utils/test-utils";

jest.mock("utils/api", () => ({
  fetchUserData: jest.fn(),
}));

describe("Login", () => {
  it("renders login form with username and password fields", () => {
    renderWithProviders(<Login />);

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("displays error message for invalid email format", async () => {
    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    fireEvent.change(usernameInput, { target: { value: "invalid-email" } });

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it("enables login button when form is valid", async () => {
    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
    });
  });

  it("calls fetchUserData and logs in successfully", async () => {
    const mockUserData = { role: "admin" };
    (fetchUserData as jest.Mock).mockResolvedValueOnce(mockUserData);

    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetchUserData).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
      );
      expect(
        screen.queryByText(/invalid username \/ password/i),
      ).not.toBeInTheDocument();
    });
  });

  it("displays error message on failed login", async () => {
    (fetchUserData as jest.Mock).mockResolvedValueOnce(null);

    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText(/invalid username \/ password/i),
      ).toBeInTheDocument();
    });
  });
});
