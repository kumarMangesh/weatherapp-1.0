import React from "react";
import {
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";

const AppSwitch = ({ label, cb }) => {
  return (
    <>
      <FormControl component="fieldset" variant="standard">
        <FormControlLabel
          control={<Switch onChange={cb} name={label} />}
          label={label}
        />
      </FormControl>
    </>
  );
};

export default AppSwitch;
