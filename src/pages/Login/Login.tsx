import React, { useCallback, useMemo, useState } from "react";

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
import { isEnterKey } from "utils/functions/keyboardFunctions";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(({ user }) => user.isUserLoggedIn);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState({ name: "", password: "" });

  const isLoginAllowed = useMemo(
    () =>
      isEmpty(formError.password) &&
      isEmpty(formError.name) &&
      username &&
      password,
    [formError.name, formError.password, password, username],
  );

  const validateEmail = useCallback((email: string) => {
    if (isEmpty(email)) {
      setFormError((prev) => ({ ...prev, name: "Email is required" }));
    } else if (!isValidEmail(email)) {
      setFormError((prev) => ({ ...prev, name: "Invalid email format" }));
    } else {
      setFormError((prev) => ({ ...prev, name: "" }));
    }
  }, []);

  const validatePassword = useCallback((password: string) => {
    if (isEmpty(password)) {
      setFormError((prev) => ({ ...prev, password: "Password is required" }));
    } else if (password.length < MINIMUM_PASSWORD_LENGTH) {
      setFormError((prev) => ({
        ...prev,
        password: `Password should contain minimum ${MINIMUM_PASSWORD_LENGTH} character`,
      }));
    } else {
      setFormError((prev) => ({ ...prev, password: "" }));
    }
  }, []);

  const onChangeUserName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
      validateEmail(event.target.value);
    },
    [validateEmail],
  );

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      validatePassword(event.target.value);
    },
    [validatePassword],
  );

  const handleSubmit = useCallback(async () => {
    const data = await fetchUserData(username, password);
    if (data) {
      //persist the login detail for page refresh
      localStorage.setItem(LOCALSTORAGE_USER_ROLE, data.role);
      dispatch(setIsUserLoggedIn(true));
      navigate("/", { replace: true });
    } else {
      setError("invalid username / password");
    }
  }, [username, password, dispatch, navigate]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (isEnterKey(event) && isLoginAllowed) {
        handleSubmit();
      }
    },
    [handleSubmit, isLoginAllowed],
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
            hasError={!isEmpty(formError.name)}
            errorMessage={formError.name}
            onKeyDown={handleKeyDown}
          />
          <Input
            name="password"
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder="Password"
            errorMessage={formError.password}
            hasError={!isEmpty(formError.password)}
            onKeyDown={handleKeyDown}
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
