import { fireEvent, renderWithProviders, screen } from "utils/test-utils";
import Table, { Column } from "./Table";

interface TableData {
  id: number;
  firstName: string;
  lastName: string;
}

const columns: Column<TableData>[] = [
  { id: "id", label: "Id" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
];

export const rows: TableData[] = [
  {
    id: 1,
    firstName: "test1 fname",
    lastName: "test1 lname",
  },
  {
    id: 2,
    firstName: "test2 fname",
    lastName: "test2 lname",
  },
  {
    id: 3,
    firstName: "test3 fname",
    lastName: "test3 lname",
  },
  {
    id: 4,
    firstName: "test4 fname",
    lastName: "test4 lname",
  },
  {
    id: 5,
    firstName: "test5 fname",
    lastName: "test5 lname",
  },
  {
    id: 6,
    firstName: "test6 fname",
    lastName: "test6 lname",
  },
];

describe("Table Component", () => {
  it("renders table", () => {
    renderWithProviders(<Table columns={columns} rows={rows} />);
    //table page size is 5
    rows.slice(0, 5).forEach((row) => {
      expect(screen.getByText(row.id.toString())).toBeInTheDocument();
      expect(screen.getByText(row.firstName)).toBeInTheDocument();
    });
  });

  it("display no data card with empty row array", () => {
    renderWithProviders(<Table columns={columns} rows={[]} />);
    expect(screen.getByText("No Data Found")).toBeInTheDocument();
  });

  it("table with pagination", () => {
    renderWithProviders(<Table columns={columns} rows={rows} />);

    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Prev"));
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });
});
