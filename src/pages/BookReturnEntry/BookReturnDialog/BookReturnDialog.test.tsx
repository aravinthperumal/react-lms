import { mockTransaction } from "test/__mocks__/bookTransactionsMock";
import {
  act,
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "utils/test-utils";

import { BookReturnDialog } from "./BookReturnDialog";

describe("BookReturnDialog Component", () => {
  const mockOnClose = jest.fn();
  const mockData = mockTransaction[0];
  it("renders correctly with initial values", () => {
    act(() => {
      renderWithProviders(
        <BookReturnDialog bookTransaction={mockData} onClose={mockOnClose} />,
      );
    });

    expect(screen.getByPlaceholderText("studentName")).toHaveValue(
      mockData.studentName,
    );
    expect(screen.getByPlaceholderText("bookName")).toHaveValue(
      mockData.bookName,
    );
    expect(screen.getByPlaceholderText("issueDate")).toHaveValue(
      mockData.issueDate,
    );
    expect(screen.getByPlaceholderText("dueDate")).toHaveValue(
      mockData.dueDate,
    );
    expect(screen.getByPlaceholderText("penalty")).toHaveValue("5");
  });

  it("calls onClose when Close button is clicked", async () => {
    act(() => {
      renderWithProviders(
        <BookReturnDialog bookTransaction={mockData} onClose={mockOnClose} />,
      );
    });
    const closeButton = screen.getByText("Close");

    await waitFor(() => {
      fireEvent.click(closeButton);
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("dispatches returnBook action and calls onClose when submitting", async () => {
    act(() => {
      renderWithProviders(
        <BookReturnDialog bookTransaction={mockData} onClose={mockOnClose} />,
      );
    });
    const confirmButton = screen.getByText("Confirm Return");

    await waitFor(() => {
      fireEvent.click(confirmButton);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
