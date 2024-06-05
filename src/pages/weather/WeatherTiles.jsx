import React from "react";
import { Typography } from "@mui/material";

const WeatherTile = ({
  label = "Wind Speed",
  value = 2,
  icon,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {icon && <img src={icon} height="20" width="20" />}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="caption-text">{value}</Typography>
          <Typography variant="caption-text">{label}</Typography>
        </div>
      </div>
    </>
  );
};

export default WeatherTile;
