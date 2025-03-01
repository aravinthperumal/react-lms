import React, { KeyboardEvent } from "react";

import { ErrorMessage, StyledInput } from "./Input.sc";

interface InputProps {
  type?: "text" | "password" | "email" | "number" | "date";
  placeholder?: string;
  value: string | number;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
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
  isDisabled,
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
        disabled={isDisabled}
        $hasError={hasError}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default Input;
