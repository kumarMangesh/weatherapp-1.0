import React from "react";
import { Typography } from "@mui/material";

const RecentSearches = ({ weatherData, cb }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer"
        }}
        onClick={() => cb(weatherData.location)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
            width="40"
            height="40"
          />
          <Typography gutterBottom variant="body2" sx={{ marginBottom: "0px" }}>
            {weatherData.location}
          </Typography>
        </div>
        <Typography
          gutterBottom
          variant="caption-text"
          sx={{ marginBottom: "0px" }}
        >
          {weatherData.weather}
        </Typography>
      </div>
    </>
  );
};

export default RecentSearches;
