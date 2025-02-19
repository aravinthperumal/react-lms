import React, { useState } from "react";
import { SearchButton, StyledSearchBarContainer } from "./SearchBar.sc";
import Input from "../input/Input";
import { EMPTY_VALUE } from "globals/constants";

interface FilterDef {
  key: string;
  placeholder: string;
}

interface SearchBarProps {
  filters: FilterDef[];
  onSearch: (searchParams: Record<string, string>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ filters, onSearch }) => {
  const [filterParams, setFilterParams] = useState<Record<string, string>>({});

  const onChangeParam = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      [key]: event.target.value,
    }));
  };

  const handleSearchSubmit = () => {
    onSearch(filterParams);
  };

  return (
    <StyledSearchBarContainer>
      {filters.map((filter) => (
        <Input
          key={filter.key}
          name={filter.key}
          placeholder={filter.placeholder}
          onChange={(e) => onChangeParam(e, filter.key)}
          value={filterParams[filter.key] || EMPTY_VALUE}
        />
      ))}

      <SearchButton onClick={handleSearchSubmit}>Search</SearchButton>
    </StyledSearchBarContainer>
  );
};

export default SearchBar;
