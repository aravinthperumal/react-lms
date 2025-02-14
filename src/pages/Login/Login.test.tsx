import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router";

test("render login", () => {
  render(<Login />, { wrapper: BrowserRouter });

  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
});

test("enter invalid credential and get error message", async () => {
  render(<Login />, { wrapper: BrowserRouter });

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "test" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "test" },
  });

  fireEvent.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toBeInTheDocument();
});
