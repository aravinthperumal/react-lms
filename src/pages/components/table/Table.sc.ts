import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Arial, sans-serif;
`;

export const StyledTh = styled.th`
  padding: 12px;
  background-color: rgb(3, 12, 94);
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
    background-color: rgb(240, 230, 230);
  }

  &:hover {
    background-color: rgb(224, 173, 173);
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const NoDataWrapper = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 16px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: rgb(10, 18, 95);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    background-color: #ddd;
  }
`;

export const LoadingWrapper = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 16px;
`;

export const StyledTbody = styled.tbody``;
