import { FunctionComponent, useCallback, useState } from "react";
import {
  LogOutButton,
  StyledHamburger,
  StyledLogo,
  StyledMenu,
  StyledMenuLink,
  StyledNavBar,
} from "./NavBar.sc";
import { useNavigate } from "react-router";

export const NavBar: FunctionComponent = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onLogOut = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <StyledNavBar>
      <StyledLogo href="">Library Management</StyledLogo>
      <StyledHamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </StyledHamburger>
      <StyledMenu isOpen={isOpen}>
        <StyledMenuLink to={"/student-list"}>Student List</StyledMenuLink>
        <StyledMenuLink to={"/book-list"}>Book List</StyledMenuLink>
        <StyledMenuLink to={"/book-taken-entry"}>
          Book Taken Entry
        </StyledMenuLink>
        <StyledMenuLink to={"/book-return-entry"}>
          Book Return Entry
        </StyledMenuLink>
        <LogOutButton onClick={onLogOut}>Logout</LogOutButton>
      </StyledMenu>
    </StyledNavBar>
  );
};
