import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import "./App.css"


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
          alert("Enter a Valid city name");
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
  // <form id="form" action="/">
  // <h1>Registration</h1>
  // <div class="input-control">
  //   <label for="username">Username</label>
  //   <input
  //     id="username"
  //     type="text"
  //     name="username"
  //     placeholder="Please enter your name"
  //   />

  return (
    <div>
      <div>
        <h1 className='head'>WEATHER APP</h1>
        <form id="form" onSubmit={handleSearch}>
          <div className="input-control">
          <input type="text" onChange={handleChange} value={city} name="Search" placeholder="Enter city name" />

          </div>
          {/* <button type='submit'>Search</button> */}
        </form>
        <div className='cont'>
        <h1>Previous searched cities: {searchHistory.map((city) => city + ", ")}</h1>
        <p>Weather Details of {data?.name}</p>
        <p>Current temperature {(data?.main?.temp - 273.15).toFixed(1)}°C</p>
        <p>Temperature range {(data?.main?.temp_max - 273.15).toFixed(1)}°C to {(data?.main?.temp_min - 273.15).toFixed(1)}°C</p>
        <p>Humidity: {data?.main?.humidity}</p>
        <p>Sea level: {((data?.main?.temp - 273.15).toFixed(1)) * 40}</p>
        <p>Ground level: {((data?.main?.temp - 273.15).toFixed(1)) * 36}</p>

        </div>
        
      </div>
    </div>
  );
}

export default App;
