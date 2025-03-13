import React from "react";
import './FavoriteBar.css';

function FavoriteBar({ weatherApiKey, weatherData, setCityId }) {

    function handleFavoriteClick(city) {
        filterCityList(city.location.name + ", " + city.location.country);
    }

    function filterCityList(requestValue) {
        fetch(`http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${requestValue}`)
            .then((response) => response.json())
            .then((data) => {
                setCityId(data[0].id);
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    }

    return (
        <div className="favorite-container">
            {weatherData.length > 0 ? (
                <div className="favorite-boxes">
                    {weatherData.map((city) => (
                        <div
                            key={city.id || city.location.name}
                            className="favourite-box"
                            onClick={() => handleFavoriteClick(city)}
                        >
                            <h1>{city.location.name}, {city.location.country}</h1>
                            <img
                                src={city.current.condition.icon}
                                alt={city.current.condition.text}
                            />
                            <h1>{city.current.temp_c}&deg;C, {city.current.temp_f}&deg;F</h1>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-favorites-message">You have no favorite cities added</p>
            )}
        </div>
    );
}

export default FavoriteBar;