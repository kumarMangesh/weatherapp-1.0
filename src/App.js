import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MapDisplay from "./components/map/MapDisplay";
import RecentSearches from "./components/weather/RecentSearches";
import AppSnackBar from "./components/AppSnackBar";
import WeatherDisplay from "./pages/weather/WeatherDisplay";
import HourlyForecast from "./components/weather/HourlyForecast";
import AppSwitch from "./components/AppSwitch";
import {
  getWeatherByName,
  getAirQuality,
  getHourlyForecast,
  getWeatherByCoordinates,
} from "./services/weatherApi";
import { Card, Box, Typography, Grid } from "@mui/material";

import "./App.css";

const weatherInit = {
  feels_like: null,
  pressure: null,
  temp: null,
  humidity: null,
  temp_max: null,
  temp_min: null,
  location: null,
  weather: null,
  icon: null,
  wind_speed: null,
  coord: {
    lat: null,
    lon: null,
  },
};

const loadingInit = {
  getWeather: false,
  getAirQuality: false,
  getHourlyForecast: false,
};

function App() {
  const [searchLocation, setSearchedLocation] = useState(null);
  const [weatherData, setweatherData] = useState(weatherInit);
  const [recentWeatherList, setRecentWeatherList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(loadingInit);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [airQData, setAirQData] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [isMetric, setIsMetric] = useState(true);
  const [tempScale, setTempScale] = useState("metric");

  useEffect(() => {
    if (searchLocation) {
      getWeatherByName(
        searchLocation,
        fetchWeatherData,
        handleSetLoading,
        handleSetError,
        tempScale
      );
    }
  }, [searchLocation]);

  useEffect(() => {
    setSearchedLocation("New Delhi");
  }, []);

  useEffect(() => {
    if (error) {
      setOpenSnackBar(true);
    }
  }, [error]);

  useEffect(() => {
    if (weatherData.coord.lat) {
      getAirQuality(
        weatherData.coord,
        (res) => airQuality(res),
        handleSetLoading,
        handleSetError,
        tempScale
      );
      getHourlyForecast(
        weatherData.coord,
        (res) => hourlyWeatherForecast(res),
        handleSetLoading,
        handleSetError,
        tempScale
      );
    }
  }, [weatherData]);

  useEffect(() => {
    if (isMetric) {
      setTempScale("metric");
    } else {
      setTempScale("imperial");
    }
  }, [isMetric]);

  useEffect(() => {
    if (searchLocation) {
      getWeatherByName(
        searchLocation,
        fetchWeatherData,
        handleSetLoading,
        handleSetError,
        tempScale
      );
    }
  }, [tempScale]);

  const handleOnChangeLocationText = (e) => {
    if (e.key === "Enter") {
      setSearchedLocation(() => e.target.value);
    }
  };

  const airQuality = (response) => {
    setAirQData(response);
  };

  const hourlyWeatherForecast = (response) => {
    setHourlyForecast(response);
  };

  const fetchWeatherData = (parsedData) => {
    setweatherData(parsedData);
    console.log(parsedData);
    const weathers = [...recentWeatherList];
    weathers.splice(0, 0, parsedData);

    if (weathers.length > 6) {
      const limitedToSixweathers = weathers.slice(0, 6);
      setRecentWeatherList(limitedToSixweathers);
    } else {
      setRecentWeatherList(weathers);
    }
  };

  const handleSetLoading = (key, value) => {
    const loadingChange = { ...loading };
    loadingChange[key] = value;
    setLoading(loadingChange);
  };

  const handleSetError = (value) => {
    if (value) {
      setError(value);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleCoordinates = (lat, long) => {
    getWeatherByCoordinates(
      { lat, long },
      fetchWeatherData,
      handleSetLoading,
      tempScale
    );
  };

  const handleToggleMetric = () => {
    setIsMetric(!isMetric);
  };

  const handleRecentSearch = (location) => {
    setSearchedLocation(location);
  };

  return (
    <>
      <AppSnackBar
        status={openSnackBar}
        handleClose={handleClose}
        error={error}
      />
      <Box margin={10}>
        <Card style={{ padding: "20px" }}>
          <div className="search-bar">
            <SearchBar
              handleOnChangeLocationText={(e) => handleOnChangeLocationText(e)}
            />
            <AppSwitch label={isMetric ? "°C" : "°F"} cb={handleToggleMetric} />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <WeatherDisplay
                weatherData={weatherData}
                loading={loading}
                isMetric={isMetric}
                airQData={airQData}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <Card>
                {weatherData.coord.lat && (
                  <MapDisplay
                    mapCoordinates={weatherData.coord}
                    locationName={weatherData.location}
                    cb={(lat, long) => handleCoordinates(lat, long)}
                  />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <Card className="search-list">
                <Typography variant="h6" padding={0}>
                  Recent searches
                </Typography>
                {recentWeatherList.map((data, index) => (
                  <RecentSearches
                    weatherData={data}
                    cb={handleRecentSearch}
                    key={index}
                  />
                ))}
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card style={{ padding: "10px", height: "200px" }}>
                <Typography variant="h6" padding={0}>
                  Hourly Forecast
                </Typography>
                <HourlyForecast data={hourlyForecast} loading={loading}/>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}

export default App;
