import React from "react";
import WeatherTile from "../pages/weather/WeatherTiles";
import { aqiLevels } from "../utils/utils";
import { Skeleton } from "@mui/material";

const AqiIndex = ({ aqi, loading }) => {
  return (
    <div>
      {loading.getAirQuality ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <WeatherTile value={aqi.pm2_5} label="pm2.5" />
          <WeatherTile value={aqi.pm10} label="pm10" />
          <WeatherTile value={aqi.aqi} label={aqiLevels[aqi.aqi]} />
        </div>
      )}
    </div>
  );
};

export default AqiIndex;
