import React from "react";
import { useState } from "react";

import './SearchInput.css';

function SearchInput({ apiKey, setCity }) {
    const [searchValue, setSearchValue] = useState('');
    const [cityList, setCityList] = useState([]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        filterCityList(e.target.value);
    };

    const handleCitySelect = (cityName, cityCountry) => {
        setCity({name:cityName, country: cityCountry});
        setSearchValue('');
        setCityList([]);
    };

    function filterCityList(requestValue) {
        fetch(`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${requestValue}`)
            .then((response) =>
                response.json())
            .then((data) => {
                setCityList(data);
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    }

    return (
        <div className="search-input">
            <form className="input-form">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Search for a city"
                    value={searchValue}
                    onChange={(e) => handleInputChange(e)} />
                {cityList.length > 0 && (
                    <ul className="dropdown-list">
                        {cityList.map((city) => (
                            <li
                                key={city.id || city.name}
                                onClick={() => handleCitySelect(city.name, city.country)}
                            >
                                {city.name}, {city.country}
                            </li>
                        ))}
                    </ul>
                )}
                {cityList.length === 0 && searchValue && (
                    <li className="no-results">No cities found</li>
                )}
            </form>
        </div>
    );
}

export default SearchInput;