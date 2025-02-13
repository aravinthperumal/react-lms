import { useCallback, useState } from "react";
import {
  LogOutButton,
  StyledHamburger,
  StyledLogo,
  StyledMenu,
  StyledMenuLink,
  StyledNavBar,
} from "./NavBar.sc";
import { useNavigate } from "react-router";
import { menuItems } from "./menuItems";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(
    () => setIsOpen((prevState) => !prevState),
    [],
  );

  const onLogOut = useCallback(() => {
    navigate("/login");
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
