import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capitol}) => {
    const [weather, setWeather] = useState({})
    const Url = () => `http://api.weatherstack.com/current?access_key=ae7de8bf0afb5fdd8bc2f9e146c7526c&query=${capitol}`

    useEffect(() => {
        axios
            .get(Url())
            .then(response => {
                setWeather(response.data)
                console.log(response.data)
        })
    })

    return (
        <>
            <h3>Weather in {capitol}</h3>
            <p><strong>Temperature</strong> {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} style={{width:100, height:100}} />
            <p><strong>wind</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </>
    )
}

export default Weather