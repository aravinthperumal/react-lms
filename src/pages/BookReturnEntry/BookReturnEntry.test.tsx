import { setupStore } from "_state/store";
import axios from "axios";
import { mockTransaction } from "test/__mocks__/bookTransactionsMock";
import { renderWithProviders, screen, waitFor } from "utils/test-utils";

import { BookReturnEntry } from "./BookReturnEntry";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Book Return Entry", () => {
  let store;
  it("render with correct header text and input elements", () => {
    renderWithProviders(<BookReturnEntry />);

    expect(screen.getByText(/Book Return Entry/i)).toBeInTheDocument();
  });

  it("displays loading state", () => {
    store = setupStore({
      bookTransaction: {
        transaction: [],
        isLoading: true,
      },
    });
    renderWithProviders(<BookReturnEntry />, { store });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("fetch and displays return entry", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockTransaction });

    const store = setupStore();
    renderWithProviders(<BookReturnEntry />, { store });

    await waitFor(() => {
      expect(store.getState().bookTransaction.transaction).toEqual(
        mockTransaction,
      );
    });

    expect(screen.getByText(/React/i)).toBeInTheDocument();
  });
});
