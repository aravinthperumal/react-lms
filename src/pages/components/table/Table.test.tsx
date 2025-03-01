import { columns, rows } from "test/__mocks__/tableMock";
import { fireEvent, renderWithProviders, screen } from "utils/test-utils";

import Table from "./Table";

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
