import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import Weathercom from './Weathercom'

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [weather, setWeather] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);

  const api = "1d4097e9f7d10574cecced005e84c574";

  const getData = (cityname) => {
    if (!cityname) return;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + api;
    axios.get(url)
      .then((res) => {
        setData(res.data);
        setWeather(weather + 20);
        setSearchHistory([...searchHistory.slice(-2), res.data.name]);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert("Invalid city");
        } else {
          console.log("err", err);
        }
      });
  }

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getData(city);
    setCity("");
  }

  useEffect(() => {
    getData("Kolkata");
  }, []);

  return (
    <div>
      <div>
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
          <input type="text" onChange={handleChange} value={city} name="Search" placeholder="Enter city name" />
          <button type='submit'>Search</button>
        </form>
        <p>Previous 3 searched cities: {searchHistory.map((city) => city + " ")}</p>
        <p>Weather Details of {data?.name}</p>
        <p>Current temperature {(data?.main?.temp - 273.15).toFixed(1)}°C</p>
        <p>Temperature range {(data?.main?.temp_max - 273.15).toFixed(1)}°C to {(data?.main?.temp_min - 273.15).toFixed(1)}°C</p>
        <p>Humidity: {data?.main?.humidity}</p>
        <p>Sea level: {((data?.main?.temp - 273.15).toFixed(1)) * 40}</p>
        <p>Ground level: {((data?.main?.temp - 273.15).toFixed(1)) * 36}</p>
      </div>
    </div>
  );
}

export default App;
