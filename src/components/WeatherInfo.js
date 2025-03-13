import React, { useState, useEffect } from "react";

import "./WeatherInfo.css";

import favoriteIconFilled from "../resources/favorite-icon-empty.png";
import favoriteIconEmpty from "../resources/favorite-icon-filled.png";

function WeatherInfo({ weatherData, forecastData, cityId, favorites, setFavorites, followingDaysArray }) {
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (cityId) {
            setFavorite(favorites.includes(cityId));
        }
    }, [favorites, cityId]);

    function handleFavoriteChange(event) {
        event.preventDefault();

        if (favorites.includes(cityId)) {
            setFavorites(favorites.filter((id) => id !== cityId));
        } else if (favorites.length < 6) {
            setFavorites([...favorites, cityId]);
        } else {
            console.log("You can add up to 6 cities as favorites")
        }
    }

    return (
        <div className="weather-container">
            <label>
                <img
                    src={favorite ? favoriteIconEmpty : favoriteIconFilled}
                    alt="favorite-icon"
                    className="favorite-button-image"
                    onClick={handleFavoriteChange}
                />
                <input
                    className="favorite-button"
                    type="checkbox"
                    onChange={() => { }}
                    checked={favorite}
                    style={{ display: "none" }}
                />
            </label>

            <h1 className="current-location">
                {weatherData.location.name}, {weatherData.location.country}
            </h1>
            <h1 className="current-temperature">
                {weatherData.current.temp_c}°C, {weatherData.current.temp_f}°F
            </h1>

            <div className="row-box">
                <h1 className="current-time">Local Time: {weatherData.location.localtime}</h1>
                <h1 className="current-condition">
                    Condition: {weatherData.current.condition.text}
                    <img src={weatherData.current.condition.icon} alt="condition-image" />
                </h1>
            </div>

            <div className="row-box">
                <h1 className="current-wind">
                    Wind: {weatherData.current.gust_kph} km/h, {weatherData.current.gust_mph} mph
                </h1>
                <h1 className="current-humidity">
                    Humidity: {weatherData.current.humidity}%
                </h1>
            </div>

            <div className="days-container">
                {followingDaysArray.map((dayName, index) => (
                    <div key={index} className="day-container">
                        <div className="day-name">{dayName}</div>
                        <div className="forecast-box">
                            <img src={forecastData.current.condition.icon} alt="condition-image" />
                            <h1>{forecastData.forecast.forecastday[index].day.avgtemp_c}°C, {forecastData.forecast.forecastday[index].day.avgtemp_f}°F</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherInfo;
