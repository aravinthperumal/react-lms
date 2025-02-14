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

const Login: React.FC = () => {
  const user = localStorage.getItem(LOCALSTORAGE_USER_ROLE);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isLoginAllowed = password.length > MINIMUM_PASSWORD_LENGTH && username;
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
        navigate("/", { replace: true });
      } else {
        setError("invalid username / password");
      }
    } catch {
      setError("something went wrong, try again");
    }
  }, [username, password, navigate]);

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
      {user && <Navigate to={"/"} />}
    </>
  );
};

export default Login;
