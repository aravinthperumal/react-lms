import { useSelector } from "_state/useSelector";
import {
  Description,
  NotFoundPageWrapper,
  StyledLink,
  Title,
} from "./NotFoundPage.sc";

export const NotFoundPage: React.FC = () => {
  //check user login to give fallback url
  const isUserLoggedIn = useSelector(({ user }) => user.isUserLoggedIn);

  return (
    <NotFoundPageWrapper>
      <Title>404 - Page Not Found</Title>
      <Description>The page you are looking for does not exist</Description>
      <StyledLink to={isUserLoggedIn ? "/" : "/login"}>
        {isUserLoggedIn ? "Go to Home" : "Go to Login"}
      </StyledLink>
    </NotFoundPageWrapper>
  );
};
