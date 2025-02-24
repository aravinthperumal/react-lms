import React, { useCallback, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { EMPTY_VALUE } from "globals/constants";
import { isEnterKey } from "utils/functions/keyboardFunctions";
import { Button, StyledSearchBarContainer } from "./SearchBar.sc";
import Input from "../input/Input";

export interface FilterDef {
  key: string;
  placeholder: string;
}

interface SearchBarProps {
  filters: FilterDef[];
}

const SearchBar: React.FC<SearchBarProps> = ({ filters }) => {
  const [filterParams, setFilterParams] = useState<Record<string, string>>({}); //[{key:'value'}]
  const navigate = useNavigate();
  const location = useLocation();

  //every page reload filter values will be updated using url query
  useEffect(() => {
    const urlSearchParams = createSearchParams(location.search); // need to check functions
    const filterParamsFromUrl: Record<string, string> = {};
    filters.forEach((filter) => {
      const value = urlSearchParams.get(filter.key);
      if (value) {
        filterParamsFromUrl[filter.key] = value;
      }
    });
    setFilterParams(filterParamsFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // this only need to be render for search parameter change

  const onChangeParam = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
      const value = event.target.value;
      setFilterParams((prev) => {
        // remove key if value is empty
        if (!value) {
          const newParams = { ...prev };
          delete newParams[key];
          return newParams;
        }
        return { ...prev, [key]: value };
      });
    },
    [],
  );

  const handleSearch = useCallback(() => {
    const queryParams = createSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      }
    });
    // navigate to same page with search query params updated page
    navigate(
      {
        pathname: location.pathname,
        search: queryParams.toString(),
      },
      { replace: true },
    );
  }, [filterParams, location.pathname, navigate]);

  const handleClear = useCallback(() => {
    setFilterParams({});
    navigate(location.pathname, { replace: true });
  }, [location.pathname, navigate]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (isEnterKey(event)) {
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <StyledSearchBarContainer>
      {filters.map((filter) => (
        <Input
          key={filter.key}
          name={filter.key}
          placeholder={filter.placeholder}
          onChange={(e) => onChangeParam(e, filter.key)}
          value={filterParams[filter.key] || EMPTY_VALUE}
          onKeyDown={handleKeyDown}
        />
      ))}

      <Button onClick={handleSearch}>Search</Button>
      {Object.keys(filterParams).length > 0 && (
        <Button onClick={handleClear}>Clear</Button>
      )}
    </StyledSearchBarContainer>
  );
};

export default SearchBar;
