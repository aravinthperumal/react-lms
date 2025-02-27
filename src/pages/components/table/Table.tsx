import { useState } from "react";
import {
  LoadingWrapper,
  NoDataWrapper,
  PaginationButton,
  PaginationContainer,
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledTh,
  StyledTr,
} from "./Table.sc";
import { NUMBER_ZERO } from "globals/constants";

export interface Column<T> {
  id: keyof T;
  label?: string;
  render?: (row: T) => React.ReactNode; //custom cell renderer
}

interface TableProps<T> {
  rows: T[];
  columns: Column<T>[];
  loading?: boolean;
}

export default function Table<T>(props: TableProps<T>) {
  const { columns, rows, loading } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); //default page size

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
              <StyledTh key={column.id as string}>{column.label}</StyledTh>
            ))}
          </StyledTr>
        </thead>
        <StyledTbody>
          {loading ? (
            <StyledTr>
              <StyledTd colSpan={columns.length}>
                <LoadingWrapper>Loading...</LoadingWrapper>
              </StyledTd>
            </StyledTr>
          ) : displayRows.length === 0 ? (
            <StyledTr>
              <StyledTd colSpan={columns.length}>
                <NoDataWrapper>No Data Found</NoDataWrapper>
              </StyledTd>
            </StyledTr>
          ) : (
            displayRows.map((row, index) => {
              return (
                <StyledTr key={index}>
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
            })
          )}
        </StyledTbody>
      </StyledTable>
      {displayRows.length > NUMBER_ZERO && (
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
      )}
    </>
  );
}
