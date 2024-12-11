import { React, useState } from "react";

import './FavoriteBar.css'

function FavoriteBar({ weatherApiKey, weatherData, setCityId }) {

    function handleFavoriteClick(city) {
        filterCityList(city.location.name + ", " + city.location.country);
    }

    function filterCityList(requestValue) {
        fetch(`http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${requestValue}`)
            .then((response) =>
                response.json())
            .then((data) => {
                setCityId(data[0].id);
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    }

    return (
        <div className="favorite-container">
            {weatherData.length > 0 && (
                <ul className="dropdown-list">
                    {weatherData.map((city) => (
                        <li
                            key={city.id || city.name}
                            onClick={() => handleFavoriteClick(city)}
                        >
                            {city.location.name}, {city.location.country}
                        </li>
                    ))}
                </ul>
            )}
            {/* <div className="favourite-box">
                <h1></h1>
                <img src={weatherData.current.condition.icon} alt={"codition-image"} />
                <h1>{weatherData.current.temp_c}C, {weatherData.current.temp_f}F</h1>
            </div>
            <div className="favourite-box">
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
            </div> */}
        </div>
    )
};

export default FavoriteBar;