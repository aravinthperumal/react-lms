import { Link } from "react-router-dom";
import styled from "styled-components";

export const ErrorCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
  text-align: center;
  color: #333;
`;

export const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 0.5em;
`;

export const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 1em;
`;

export const StyledLink = styled(Link)`
  font-size: 1em;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const RefreshButton = styled.button`
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
