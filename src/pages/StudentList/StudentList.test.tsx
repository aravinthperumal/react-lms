// StudentList.test.tsx
import axios from "axios";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "utils/test-utils";
import { setupStore } from "_state/store";
import { StudentList } from "pages/studentList/StudentList";
import { studentData } from "test/__mocks__/studenListMock";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("StudentList", () => {
  test("Student List with initial state", () => {
    renderWithProviders(<StudentList />, {
      preloadedState: { student: { studentList: [], isLoading: false } },
    });

    expect(screen.getByText(/Student List/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by id/i)).toBeInTheDocument();
  });

  test("fetch and displays students", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: studentData });

    const store = setupStore();
    renderWithProviders(<StudentList />, { store });

    await waitFor(() => {
      expect(store.getState().student.studentList).toEqual(studentData);
    });

    expect(screen.getByText(/STD0001/i)).toBeInTheDocument();
  });

  test("displays loading while fetching students", async () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<StudentList />, {
      preloadedState: { student: { studentList: [], isLoading: true } },
    });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("handles API failure", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

    const store = setupStore();
    renderWithProviders(<StudentList />, { store });

    await waitFor(() => {
      expect(store.getState().student.studentList).toEqual([]);
    });
  });
  test("Student list with pagination", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: studentData });

    const store = setupStore();
    renderWithProviders(<StudentList />, { store });

    await waitFor(() => {
      expect(store.getState().student.studentList).toEqual(studentData);
    });

    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });
});
