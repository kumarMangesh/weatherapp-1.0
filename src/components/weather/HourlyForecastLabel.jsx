import React from "react";
import { Divider } from "@mui/material";

const HourlyForecastLabel = ({ time, temp, humidity }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "40px",
          margin: "0 18px",
          alignItems: "center"
        }}
      >
        <span style={{ marginTop: "10px" }}>{humidity}</span>
        <Divider sx={{height: "10px"}} orientation="vertical" variant="middle" />
        <span style={{ marginTop: "10px" }}>{temp}</span>
        <Divider sx={{height: "10px"}} orientation="vertical" variant="middle" />
        <span style={{ marginTop: "10px" }}>{time}</span>
      </div>
    </>
  );
};

export default HourlyForecastLabel;
