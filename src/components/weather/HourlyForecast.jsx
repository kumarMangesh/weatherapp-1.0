import React from "react";
import PropTypes from "prop-types";
import HourlyForecastLabel from "./HourlyForecastLabel";
import { Skeleton } from "@mui/material";

const HourlyForecast = ({ data, loading }) => {
  return (
    <>
      {loading.getHourlyForecast ? (
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
            overflowX: "scroll",
          }}
        >
          <HourlyForecastLabel time="Time" temp="Temp" humidity="Humidity" />
          {data.map((element, index) => (
            <HourlyForecastLabel
              key={index}
              time={element.hours}
              temp={element.temp}
              humidity={element.humidity}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default HourlyForecast;

HourlyForecast.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.object,
  cb: PropTypes.func,
};
