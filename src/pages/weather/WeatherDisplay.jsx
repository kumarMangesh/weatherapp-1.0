import React from "react";
import PropTypes from "prop-types";
import { Card, Typography, Skeleton } from "@mui/material";
import { Place } from "@mui/icons-material";
import WeatherTile from "./WeatherTiles";
import AqiIndex from "../../components/AqiIndex";

const WeatherDisplay = ({ weatherData, loading, isMetric, airQData }) => {
  const date = new Date();
  let currentTime = `${date.getHours()} : ${date.getMinutes()}`;

  return (
    <Card style={{ padding: 10, height: "282px" }}>
      {loading.getWeather ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography variant="h6" padding={0}>
                Current weather
              </Typography>
              <Typography gutterBottom variant="caption-text" padding={0}>
                {currentTime}
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Place />
                <span>{weatherData.location}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "4px 0",
              }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                width="70"
                height="70"
              />
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    sx={{ marginBottom: "0px" }}
                  >
                    {weatherData.temp}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {isMetric ? "°C" : "°F"}
                  </Typography>
                </div>
                <Typography gutterBottom variant="h6">
                  {weatherData.weather}
                </Typography>
              </div>
            </div>
          </div>
          <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <WeatherTile
                label="Wind"
                value={`${weatherData.wind_speed} ${
                  isMetric ? "m/s" : "mi/h"
                } `}
                icon="/wind.svg"
              />
              <WeatherTile
                label="Pressure"
                value={`${weatherData.pressure}`}
                icon="/pressure.svg"
              />
              <WeatherTile
                label="Feels"
                value={`${weatherData.feels_like} ${isMetric ? "°C" : "°F"}`}
                icon="/man.svg"
              />
              <WeatherTile
                label="Humidity"
                value={weatherData.humidity}
                icon="/humidity.svg"
              />
            </div>
          </div>
          <div style={{ margin: "17px 0" }}>
            <Typography variant="h6" padding={0}>
              Air Quality
            </Typography>
            <AqiIndex aqi={airQData} loading={loading} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default WeatherDisplay;

WeatherDisplay.propTypes = {
  weatherData: PropTypes.object,
  loading: PropTypes.object,
  isMetric: PropTypes.bool,
  airQData: PropTypes.object,
};
