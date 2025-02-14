import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  background-color: "#fff";
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #999;
  }
`;
