import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBar = ({  handleOnChangeLocationText }) => {
  return (
    <>
      <span>
        <TextField
          label="Search Location"
          size="small"
          variant="outlined"
          id="outlined-size-small"
          onKeyDown={(e) => handleOnChangeLocationText(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </span>
      
    </>
  );
};

export default SearchBar;

<style>.grid-container {}</style>;
