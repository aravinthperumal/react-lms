import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Arial, sans-serif;
`;

export const StyledTh = styled.th`
  padding: 12px;
  background-color: rgb(243, 130, 64);
  color: white;
  text-align: left;
  border: 1px solid #ddd;
  font-weight: bold;
`;

export const StyledTd = styled.td`
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
`;

export const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: rgb(224, 173, 173);
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const PaginationButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    background-color: #ddd;
  }

  &:hover {
    background-color: #45a049;
  }
`;

export const StyledTbody = styled.tbody``;
