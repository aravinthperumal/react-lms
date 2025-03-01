import React from "react";

import { StyledButton } from "./Button.sc";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
