import React from "react";
import { DropdownContainer, Option, Select } from "./Dropdown.sc";
import { KeyValue } from "./types";

interface DropdownProps {
  options: KeyValue[];
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown = ({ options, value, onChange, name }: DropdownProps) => {
  return (
    <DropdownContainer>
      <Select name={name} value={value} onChange={onChange}>
        <Option value="" disabled>
          Select an option
        </Option>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </DropdownContainer>
  );
};
