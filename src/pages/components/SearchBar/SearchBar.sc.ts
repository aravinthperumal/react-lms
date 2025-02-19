import styled from "styled-components";

export const StyledSearchBarContainer = styled.div`
  gap: 10px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

export const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: rgb(83, 182, 240);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #d4d4d4;
  }
`;
