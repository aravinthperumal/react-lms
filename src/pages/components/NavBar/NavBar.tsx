import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "_state/useDispatch";
import { LOCALSTORAGE_USER_ROLE } from "globals/constants";
import {
  LogOutButton,
  StyledHamburger,
  StyledLogo,
  StyledMenu,
  StyledMenuLink,
  StyledNavBar,
} from "./NavBar.sc";
import { menuItems } from "./menuItems";
import { logOut } from "pages/login/_state/userSlice";
import { useSelector } from "_state/useSelector";
import { removeFromLocalStorage } from "utils/localStorage/localStorage";

export const NavBar: React.FC = () => {
  const { name } = useSelector(({ user }) => user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(
    () => setIsOpen((prevState) => !prevState),
    [],
  );

  const onLogOut = useCallback(() => {
    removeFromLocalStorage(LOCALSTORAGE_USER_ROLE);
    dispatch(logOut());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return (
    <StyledNavBar>
      <StyledLogo>LMS Welcome {name}</StyledLogo>
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
