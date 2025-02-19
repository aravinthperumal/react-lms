import { fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import * as api from "utils/api";
import { useNavigate } from "react-router-dom";
import { LOCALSTORAGE_USER_ROLE } from "globals/constants";
import { render, screen } from "utils/test-utils";

jest.mock("utils/api", () => ({
  fetchUserData: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Page", () => {
  let setItemSpy: jest.SpyInstance;
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test("render login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("enter invalid password length and password test login button disabled", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "test" },
    });

    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeDisabled();
  });

  test("enter valid password length username and password test login button enabled", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "admin@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "testpassword" },
    });

    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeEnabled();
  });

  test("should give error when invalid input is provided", async () => {
    (api.fetchUserData as jest.Mock).mockResolvedValueOnce(null);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "lmsadmin@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongPassword" },
    });

    const loginButton = screen.getByRole("button");

    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(api.fetchUserData).toHaveBeenCalledWith(
        "lmsadmin@gmail.com",
        "wrongPassword",
      );
      expect(setItemSpy).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(
        screen.getByText(/invalid username \/ password/i),
      ).toBeInTheDocument();
    });
  });

  test("should login with api when valid input is provided", async () => {
    (api.fetchUserData as jest.Mock).mockResolvedValueOnce({ role: "admin" });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "lmsadmin@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "admin123" },
    });

    const loginButton = screen.getByRole("button");

    expect(screen.getByRole("button")).toBeEnabled();

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(api.fetchUserData).toHaveBeenCalledWith(
        "lmsadmin@gmail.com",
        "admin123",
      );
      expect(setItemSpy).toHaveBeenCalledWith(LOCALSTORAGE_USER_ROLE, "admin");
      // expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });
});
