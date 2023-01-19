import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {

  const [paises, setpaises] = useState([])
  const [filter, setfilter] = useState('')
  const [array, setarray] = useState([])
  const [weather, setweather] = useState({})

  useEffect(() => {
    axios.request({
      method: 'GET',
      url: 'http://api.weatherstack.com/current',
      params: { access_key: process.env.REACT_APP_API_KEY, query: array[0]?.name.common }
    }).then((response) => {
      setweather(response.data)
    })
  }, [array])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(resp => {
      setpaises(resp.data)
      console.log("🚀 ~ file: index.js:16 ~ axios.get ~ resp.data", resp.data)
    })
  }, [])

  const Weather = ({ weather }) => {
    console.log(weather)
    return (
      <>
        <h2>Weather in {weather.location.country}</h2>
        <div>Temperature: {weather.current.temperature} Celcius</div>
        <img src={weather.current.weather_icons[0]} alt="weatherIcon" />
        <div>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
      </>
    )
  }

  const changeFilter = (event) => {
    setfilter(event.target.value)
    setarray(paises.filter(resp => resp.name.common.toUpperCase().includes(event.target.value.toUpperCase())))
  }

  const getPais = (pais) => {
    setfilter(pais.name.common)
    setarray([pais])
  }

  const Desc = ({ array }) => {
    if (array.length === 1) {
      const pais = array[0]
      return (
        <>
          <h1>
            {pais.name.common}
          </h1>

          <div>capital {pais.capital[0]}</div>
          <div>population {pais.population}</div>

          <h2>languages</h2>
          {
            Object.entries(pais.languages).map((res, i) => <div key={i}>• {res[1]}</div>)
          }
          <img src={pais.flags.png} alt={pais.name.common} />
          <Weather weather={weather} />
        </>
      )
    } else if (array.length <= 10) {
      return (
        array.map((res, i) => <div key={i}>{res.name.common} <button onClick={() => getPais(res)}>show</button></div>)
      )
    } else {
      return "To many Matches"
    }

  }

  return (
    <div>
      <div>Find countries <input value={filter} onChange={changeFilter} /></div>
      <Desc array={array} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

