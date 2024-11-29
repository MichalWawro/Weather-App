import React, { useEffect } from "react";

import './WeatherInfo.css'

function WeatherInfo({weatherData}) {

    useEffect(() => {
        console.log(weatherData);
    }, []);
    return (
        <div className="weather-container">
            <h1>City: {weatherData.location.name}</h1>
            <h1>Country: {weatherData.location.country}</h1>
            <h1>Local Time: {weatherData.location.localtime}</h1>
            <h1>Condition: {weatherData.current.condition.text} {<img src={weatherData.current.condition.icon}></img>}</h1>
            <h1>Temp: {weatherData.current.temp_c} *C, {weatherData.current.temp_f} *F</h1>
            <h1>Wind: {weatherData.current.gust_kph} km/h, {weatherData.current.gust_mph} mp/h</h1>
            <h1>Humidity: {weatherData.current.humidity}</h1>
        </div>
    )
};

export default WeatherInfo;