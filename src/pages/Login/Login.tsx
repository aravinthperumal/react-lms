import React, { useCallback, useState } from "react";

import { useNavigate } from "react-router";
import {
  LOCALSTORAGE_USER_ROLE,
  MINIMUM_PASSWORD_LENGTH,
} from "globals/constants";
import {
  ErrorText,
  LoginCardWrapper,
  LoginContainer,
  LoginTitle,
  SubmitButton,
} from "./Login.sc";
import { fetchUserData } from "utils/api";
import { Navigate } from "react-router";
import Input from "pages/components/input/Input";
import { useDispatch } from "_state/useDispatch";
import { setIsUserLoggedIn } from "./_state/userSlice";
import { useSelector } from "_state/useSelector";
import { isEmpty, isValidEmail } from "utils/functions/validationFunctions";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(({ user }) => user.isUserLoggedIn);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isLoginAllowed =
    password.length > MINIMUM_PASSWORD_LENGTH &&
    !isEmpty(username) &&
    isValidEmail(username);
  const onChangeUserName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    try {
      const data = await fetchUserData(username, password);
      if (data) {
        localStorage.setItem(LOCALSTORAGE_USER_ROLE, data.role);
        dispatch(setIsUserLoggedIn(true));
        navigate("/", { replace: true });
      } else {
        setError("invalid username / password");
      }
    } catch {
      setError("something went wrong, try again");
    }
  }, [username, password, dispatch, navigate]);

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [],
  );
  return (
    <>
      <LoginCardWrapper>
        <LoginContainer>
          <LoginTitle>Login</LoginTitle>
          <Input
            name="username"
            value={username}
            type="email"
            onChange={onChangeUserName}
            placeholder="Username"
          />
          <Input
            name="password"
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder="Password"
          />

          <SubmitButton disabled={!isLoginAllowed} onClick={handleSubmit}>
            Login
          </SubmitButton>
          {error && <ErrorText>{error}</ErrorText>}
        </LoginContainer>
      </LoginCardWrapper>
      {isUserLoggedIn && <Navigate to={"/"} />}
    </>
  );
};

export default Login;
