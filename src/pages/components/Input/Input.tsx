import React, { KeyboardEvent } from "react";
import { ErrorMessage, StyledInput } from "./Input.sc";

interface InputProps {
  type?: "text" | "password" | "email";
  placeholder?: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  name,
  onChange,
  hasError,
  errorMessage,
  onKeyDown,
}) => {
  return (
    <div>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        $hasError={hasError}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default Input;
