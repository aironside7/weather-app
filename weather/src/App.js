import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import Weathercom from './Weathercom'

const App = () => {
   const [city,setCity]=useState("")
   
   const [data,setData]=useState([])
   const [weather,setWeather]=useState(0)
      const api ="1d4097e9f7d10574cecced005e84c574"

   const getData=(cityname)=>{
        if(!cityname)
          return 
          const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname +"&appid="+api;
          axios.get(url,setWeather(weather+20))
          .then((res)=>{
            setData(res.data)
          }).catch((err)=>{
               console.log("err",err)
          })
          setWeather(weather+70)
        
   }

   const handleChange=(e)=>{
       setCity(e.target.value)
   }
   const handleSearch=()=>{
      getData(city)
      setCity("")
   }

   useEffect(()=>{
    getData("Kolkata")
   },[data])

  return (
    <div>
      <div>
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
        <input type="text" onChange={handleChange} value={city} name="Search"  ></input>
        <button type='submit'>click</button>
        </form>
        {/* <input type="text" onChange={handleChange} value={city} name="Search" ></input> */}
        {/* <button onClick={handleSearch}>click</button> */}
       
           <p>Wheather Details of {data?.name}</p>
           <p>Current temparature {(data?.main?.temp - 273.15).toFixed(1)}°C</p> 
           <p> Temparature range {(data?.main?.temp_max - 273.15).toFixed(1)}°C to  {(data?.main?.temp_min - 273.15).toFixed(1)}°C </p> 
          <p>Humidity:{data?.main?.humidity}</p> 
          <p>Sea level: {((data?.main?.temp - 273.15).toFixed(1))*40}</p>
          <p>Ground level: {((data?.main?.temp - 273.15).toFixed(1))*36}</p>

          <p></p>





           
      </div>

      
    </div>
  )
}

export default App
