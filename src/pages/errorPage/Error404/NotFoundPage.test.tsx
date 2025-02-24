import { renderWithProviders, screen } from "utils/test-utils";
import { NotFoundPage } from "./NotFoundPage";

describe("Page not found", () => {
  it('Display "Go to Home" link when user is logged in', () => {
    renderWithProviders(<NotFoundPage />, {
      preloadedState: {
        user: { isUserLoggedIn: true },
      },
    });

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go to home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it('displays "Go to Login" link when user is not logged in', () => {
    renderWithProviders(<NotFoundPage />, {
      preloadedState: {
        user: { isUserLoggedIn: false },
      },
    });

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go to login/i })).toHaveAttribute(
      "href",
      "/login",
    );
  });
});
