import React, { useCallback, useState } from "react";
import {
  LoginCardWrapper,
  LoginContainer,
  LoginTitle,
  SubmitButton,
} from "./Login.sc";
import Input from "pages/components/Input/Input";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUserName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [],
  );

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    // Todo need to handle validation with json server api call
    navigate("/");
  }, [navigate]);

  return (
    <LoginCardWrapper>
      <LoginContainer>
        <LoginTitle>Login</LoginTitle>
        <Input
          value={username}
          onChange={onChangeUserName}
          placeholder="Username"
        />

        <Input
          value={password}
          onChange={onChangePassword}
          type="password"
          placeholder="Password"
        />

        <SubmitButton disabled={!username || !password} onClick={handleSubmit}>
          Login
        </SubmitButton>
      </LoginContainer>
    </LoginCardWrapper>
  );
};

export default Login;
