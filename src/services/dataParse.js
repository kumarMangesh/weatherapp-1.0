const airQResponse = (response) => {
  if (response?.status === 200) {
    const responseData = response.data.list[0];
    return { ...responseData.components, ...responseData.main };
  }
};

const hourlyResponse = (response) => {
  if (response?.status === 200) {
    const responseData = response.data.list.map((res) => {
      return {
        icon: res.weather[0].icon,
        temp: res.main.temp,
        humidity: res.main.humidity,
        feels_like: res.main.feels_like,
        time: res.dt_txt,
        hours: res.dt_txt.slice(10, 16),
      };
    });
    return responseData;
  }
};

const weatherResponse = (response) => {
  const data = response.data;
  return {
    feels_like: data.main.feels_like,
    pressure: data.main.pressure,
    temp: data.main.temp,
    humidity: data.main.humidity,
    temp_max: data.main.temp_max,
    temp_min: data.main.temp_min,
    location: `${data.name}, ${data.sys.country}`,
    weather: data.weather[0].description,
    icon: data.weather[0].icon,
    wind_speed: data.wind.speed,
    coord: data.coord,
  };
};

export { airQResponse, hourlyResponse, weatherResponse };
