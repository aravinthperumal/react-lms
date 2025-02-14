import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import {
  LogOutButton,
  StyledHamburger,
  StyledLogo,
  StyledMenu,
  StyledMenuLink,
  StyledNavBar,
} from "./NavBar.sc";
import { menuItems } from "./menuItems";
import { LOCALSTORAGE_USER_ROLE } from "globals/constants";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(
    () => setIsOpen((prevState) => !prevState),
    [],
  );

  const onLogOut = useCallback(() => {
    localStorage.removeItem(LOCALSTORAGE_USER_ROLE);
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <StyledNavBar>
      <StyledLogo>Library Management</StyledLogo>
      <StyledHamburger onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </StyledHamburger>
      <StyledMenu $isOpen={isOpen}>
        {menuItems.map((item) => (
          <StyledMenuLink key={item.path} to={item.path}>
            {item.label}
          </StyledMenuLink>
        ))}

        <LogOutButton onClick={onLogOut}>Logout</LogOutButton>
      </StyledMenu>
    </StyledNavBar>
  );
};
