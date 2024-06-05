import axios from "axios";
import { weatherResponse, airQResponse, hourlyResponse } from "./dataParse";

const baseUrl = process.env.REACT_APP_API_URL;
const authKey = process.env.REACT_APP_API_KEY;

export async function getWeatherByName(
  location,
  cb,
  loading,
  errorcb,
  units = "metric"
) {
  try {
    loading("getWeather", true);
    const response = await axios.get(
      `${baseUrl}/2.5/weather?q=${location}&appid=${authKey}&units=${units}`
    );
    cb(weatherResponse(response));
    loading("getWeather", false);
  } catch (error) {
    errorcb(error.response.data.message);
    loading("getWeather", false);
    return error;
  }
}

export async function getWeatherByCoordinates(
  { lat, long },
  cb,
  loading,
  errorcb,
  units = "metric"
) {
  try {
    loading("getWeather", true);
    const response = await axios.get(
      `${baseUrl}/2.5/weather?lat=${lat}&lon=${long}&appid=${authKey}&cnt=${10}&units=${units}`
    );

    cb(weatherResponse(response));
    loading("getWeather", false);
  } catch (error) {
    errorcb(error.response.data.message);
    loading("getWeather", false);
    return error;
  }
}

export async function getAirQuality(
  { lat, lon },
  cb,
  loading,
  errorcb,
  units = "metric"
) {
  try {
    loading("getAirQuality", true);
    const response = await axios.get(
      `${baseUrl}/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${authKey}`
    );
    cb(airQResponse(response));
    loading("getAirQuality", false);
  } catch (error) {
    errorcb(error.response.data.message);
    loading("getAirQuality", false);
    return error;
  }
}

export async function getHourlyForecast(
  { lat, lon },
  cb,
  loading,
  errorcb,
  units = "metric"
) {
  try {
    loading("getHourlyForecast", true);
    const response = await axios.get(
      `${baseUrl}/2.5/forecast?lat=${lat}&lon=${lon}&appid=${authKey}&units=${units}&cnt=${20}`
    );
    cb(hourlyResponse(response));
    loading("getHourlyForecast", false);
    return hourlyResponse(response);
  } catch (error) {
    errorcb(error.response.data.message);
    loading("getHourlyForecast", false);
    return error;
  }
}
