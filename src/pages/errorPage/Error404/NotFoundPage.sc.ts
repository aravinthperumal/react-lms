import { Link } from "react-router-dom";
import styled from "styled-components";

export const NotFoundPageWrapper = styled.div`
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
