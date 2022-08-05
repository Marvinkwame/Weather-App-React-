import React from "react";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/CurrentWeather/currentWeather";
import Forecast from "./components/Forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = React.useState(null)
  const [forecast, setForecast] = React.useState(null)


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFiveDays = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFiveDays])
      .then( async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json()

        setCurrentWeather({ city: searchData.label, ...weatherResponse})
        setForecast({ city: searchData.label, ...forecastResponse})
      })
      .catch((err) => console.log(err))
  };

  console.log(currentWeather)
  console.log(forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} /> }
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
