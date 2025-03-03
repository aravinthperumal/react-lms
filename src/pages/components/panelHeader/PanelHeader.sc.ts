import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const HeaderText = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

export const ButtonGroup = styled.div`
  & > button {
    margin-left: 8px;
  }
`;
