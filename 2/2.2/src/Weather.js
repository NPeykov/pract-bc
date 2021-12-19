import { useState, useEffect } from "react";
import { getWeather } from "./services/weather";

const INITIAL_STATE = {
  ubication: "loading",
  time: "loading",
  temperature: "loading",
  icon: "loading",
  pressure: "loading",
  humidity: "loading",
};

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(INITIAL_STATE);

  useEffect(() => {
    getWeather(city).then(response => setWeather(response))
    return () => setWeather({})
  }, [city]);

  return (
    <div>
      <h1 style={{ color: "blue" }}>WEATHER</h1>
      <h3>Ubication: {weather.ubication}</h3>
      <img src={weather.icon} alt="Weather icon"></img>
      <h3>Statistics</h3>
      <ul>
        <li>Time: {weather.time}</li>
        <li>Temperature: {weather.temperature}</li>
        <li>Pressure: {weather.pressure}</li>
        <li>Humidity: {weather.humidity}</li>
      </ul>
    </div>
  );
};

export default Weather;
