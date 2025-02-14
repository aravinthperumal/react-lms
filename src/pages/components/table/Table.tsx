import { useState } from "react";
import {
  PaginationButton,
  PaginationContainer,
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledTh,
  StyledTr,
} from "./Table.sc";

export interface Column<T> {
  id: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  rows: T[];
  columns: Column<T>[];
}

export default function Table<T>(props: Props<T>) {
  const { columns, rows } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(2);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const displayRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <StyledTable>
        <thead>
          <StyledTr>
            {columns.map((column) => (
              <StyledTh key={column.id as string}>
                {column.render ? "" : column.label}
              </StyledTh>
            ))}
          </StyledTr>
        </thead>
        <StyledTbody>
          {displayRows.map((row, index) => {
            return (
              <StyledTr tabIndex={-1} key={index}>
                {columns.map((column, index) => {
                  return (
                    <StyledTd key={index}>
                      {column.render
                        ? column.render(row)
                        : (row[column?.id] as string)}
                    </StyledTd>
                  );
                })}
              </StyledTr>
            );
          })}
        </StyledTbody>
      </StyledTable>
      <PaginationContainer>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Prev
        </PaginationButton>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </>
  );
}
