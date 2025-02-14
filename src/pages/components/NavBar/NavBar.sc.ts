import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface StyledMenuProps {
  //isOpen: boolean;
  $isOpen: boolean; // Note the $ prefix to prevent the prop from being passed to DOM
}

export const StyledNavBar = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 1px 2px 4px 1px rgba(56, 7, 170, 0.2);
`;

export const StyledLogo = styled.a`
  padding: 1rem 0;
  color: rgb(233, 111, 41);
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

export const LogOutButton = styled.a`
  padding: 1rem 0;
  color: rgb(233, 111, 41);
  text-decoration: none;
  font-weight: 800;
  cursor: pointer;
  font-size: 1.7rem;
  &:hover {
    color: rgb(30, 134, 231);
  }
`;

export const StyledMenuLink = styled(NavLink)`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: rgb(25, 42, 197);
  transition: all 0.3s ease-in;
  font-size: 1.2rem;
  font-weight: bold;
  &.active {
    color: rgb(30, 134, 231);
  }
  &:hover {
    color: rgb(233, 111, 41);
  }
`;

export const StyledHamburger = styled.div`
  display: none;

  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const StyledMenu = styled.div<StyledMenuProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: auto;
    flex-direction: column;
    max-height: ${(props): string => (props.$isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;
