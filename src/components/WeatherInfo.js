import React, { useEffect } from "react";

import './WeatherInfo.css'

function WeatherInfo({weatherData}) {

    useEffect(() => {
        console.log(weatherData);
    }, []);
    return (
        <div className="weather-container">
            <h1>{weatherData.location.name}, {weatherData.location.country}</h1>
        </div>
    )
};

export default WeatherInfo;