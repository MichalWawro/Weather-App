import React, { useEffect } from "react";

import './WeatherInfo.css'

function WeatherInfo({ weatherData }) {

    useEffect(() => {
        console.log(weatherData);
    }, []);
    return (
        <div className="weather-container">
            <h1 className="current-location">{weatherData.location.name}, {weatherData.location.country}</h1>
            <h1 className="current-temperature">{weatherData.current.temp_c} *C, {weatherData.current.temp_f} *F</h1>
            <div className="row-box">
                <h1 className="current-time">Local Time: {weatherData.location.localtime}</h1>
                <h1 className="current-condition">Condition: {weatherData.current.condition.text} {<img src={weatherData.current.condition.icon} alt={"codition-image"} />}</h1>
            </div>
            <div className="row-box">
                <h1 className="current-wind">Wind: {weatherData.current.gust_kph} km/h, {weatherData.current.gust_mph} mp/h</h1>
                <h1 className="current-humidity">Humidity: {weatherData.current.humidity}</h1>
            </div>
            <div className="forecast-container">
                <div className="forecast-box">
                    <img src={weatherData.current.condition.icon} alt={"codition-image"} />
                    <h1>{weatherData.current.temp_c}C, {weatherData.current.temp_f}F</h1>
                </div>
                <div className="forecast-box">
                    <img src={weatherData.current.condition.icon} alt={"codition-image"} />
                    <h1>{weatherData.current.temp_c}C, {weatherData.current.temp_f}F</h1>
                </div>
                <div className="forecast-box">
                    <img src={weatherData.current.condition.icon} alt={"codition-image"} />
                    <h1>{weatherData.current.temp_c}C, {weatherData.current.temp_f}F</h1>
                </div>
                <div className="forecast-box">
                    <img src={weatherData.current.condition.icon} alt={"codition-image"} />
                    <h1>{weatherData.current.temp_c}C, {weatherData.current.temp_f}F</h1>
                </div>
            </div>
        </div>
    )
};

export default WeatherInfo;