import React from "react";
import { StyledInput } from "./Input.sc";

interface InputProps {
  type?: "text" | "password";
  placeholder?: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  name,
  onChange,
}) => {
  return (
    <div>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
